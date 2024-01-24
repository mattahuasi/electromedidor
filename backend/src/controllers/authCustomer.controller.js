import { User, Customer } from "../models/User.js";
import { createdAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await Customer.findOne({
      include: [
        {
          model: User,
          where: { email },
          attributes: [
            "id",
            "firstName",
            "lastName",
            "ci",
            "phone",
            "email",
            "password",
          ],
        },
      ],
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });

    const isMatch = await bcrypt.compare(password, userFound.user.password);
    if (!isMatch)
      return res.status(404).json({ errors: ["Password incorrect"] });

    const token = await createdAccessToken({
      id: userFound.id,
    });

    res.json({
      id: userFound.id,
      user: {
        id: userFound.user.id,
        firstName: userFound.user.firstName,
        lastName: userFound.user.lastName,
        ci: userFound.user.ci,
        phone: userFound.user.phone,
        email: userFound.user.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ errors: ["Unauthorized"] });

    jwt.verify(token, process.env.APP_TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ errors: ["Unauthorized"] });

      const userFound = await Customer.findOne({
        attributes: ["id"],
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
          },
        ],
      });
      if (!userFound) return res.status(401).json({ errors: ["Unauthorized"] });

      res.json(userFound);
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};
