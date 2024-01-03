import { Person, User } from "../models/Person.js";
import { createdAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({
      attributes: ["id", "password", "admin"],
      include: [
        {
          model: Person,
          where: { email },
          attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(404).json({ errors: ["Password incorrect"] });
    const token = await createdAccessToken({ id: userFound.id });
    res.json({
      id: userFound.id,
      email: userFound.person.email,
      admin: userFound.admin,
      person: {
        id: userFound.person.id,
        firstName: userFound.person.firstName,
        lastName: userFound.person.lastName,
        ci: userFound.person.ci,
        phone: userFound.person.phone,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, repeatPassword } = req.body;
    const userFound = await User.findOne({ where: { id: req.user.id } });
    if (newPassword !== repeatPassword)
      return res.status(500).json({ errors: ["Passwords don't match"] });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });
    const isMatch = await bcrypt.compare(oldPassword, userFound.password);
    if (!isMatch)
      return res.status(500).json({ errors: ["Password incorrect"] });
    const PasswordHash = await bcrypt.hash(newPassword, 10);
    userFound.password = PasswordHash;
    userFound.save();
    res.json({ id: userFound.id });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "admin"],
      include: [
        {
          model: Person,
          attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    if (!userFound) return res.status(400).json({ errors: ["User not found"] });
    res.json(userFound);
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
      const userFound = await User.findOne({
        where: { id: user.id },
        attributes: ["id", "admin"],
        include: [
          {
            model: Person,
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

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email } = req.body;
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "admin", "personId"],
    });
    if (!user) return res.status(400).json({ errors: ["User not found"] });
    const person = await Person.findOne({ where: { id: user.personId } });
    person.firstName = firstName;
    person.lastName = lastName;
    person.ci = ci;
    person.phone = phone;
    person.email = email;
    await person.save();
    const userFound = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "admin"],
      include: [
        {
          model: Person,
          attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    res.json(userFound);
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};
