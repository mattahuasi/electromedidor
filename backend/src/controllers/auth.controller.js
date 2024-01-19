import { User, Employee, Customer } from "../models/User.js";
import { createdAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({
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
      include: [
        {
          model: Employee,
          where: { staff: true },
          attributes: ["id", "staff", "admin"],
          required: false,
        },
        {
          model: Customer,
          attributes: ["id"],
          required: false,
        },
      ],
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(404).json({ errors: ["Password incorrect"] });

    const id = userFound.employee
      ? userFound.employee.id
      : userFound.customer.id;

    const data = {
      id: id,
      email: userFound.email,
    };

    if (userFound.employee) {
      data.staff = userFound.employee.staff;
      data.admin = userFound.employee.admin;
      data.user = {
        id: userFound.id,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        ci: userFound.ci,
        phone: userFound.phone,
      };
    } else {
      data.user = {
        id: userFound.id,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        ci: userFound.ci,
        phone: userFound.phone,
      };
    }

    const token = await createdAccessToken({ id: userFound.id });
    data.token = token;

    res.json(data);
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
        attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        include: [
          {
            model: Employee,
            where: { staff: true },
            attributes: ["id", "staff", "admin"],
            required: false,
          },
          {
            model: Customer,
            attributes: ["id"],
            required: false,
          },
        ],
      });
      if (!userFound) {
        return res.status(404).json({ errors: ["Unauthorized"] });
      }

      const id = userFound.employee
        ? userFound.employee.id
        : userFound.customer.id;

      const data = {
        id: id,
        email: userFound.email,
      };

      if (userFound.employee) {
        data.staff = userFound.employee.staff;
        data.admin = userFound.employee.admin;
        data.user = {
          id: userFound.id,
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          ci: userFound.ci,
          phone: userFound.phone,
        };
      } else {
        data.user = {
          id: userFound.id,
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          ci: userFound.ci,
          phone: userFound.phone,
        };
      }

      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, repeatPassword } = req.body;

    if (newPassword !== repeatPassword)
      return res.status(500).json({ errors: ["Passwords don't match"] });

    const userFound = await User.findOne({
      where: { id: req.user.id },
      include: [
        { model: Employee, where: { staff: true }, required: false },
        { model: Customer, required: false },
      ],
    });
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
      attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
      include: [
        { model: Employee, where: { staff: true }, required: false },
        { model: Customer, required: false },
      ],
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });

    res.json(userFound);
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email } = req.body;

    const userFound = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
      include: [
        { model: Employee, where: { staff: true }, required: false },
        { model: Customer, required: false },
      ],
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });

    userFound.firstName = firstName;
    userFound.lastName = lastName;
    userFound.ci = ci;
    userFound.phone = phone;
    userFound.email = email;
    userFound.save();

    res.json(userFound);
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email, password } = req.body;

    const userEmail = await User.findOne({ where: { email } });
    if (userEmail)
      return res.status(400).json({ errors: ["User already exists"] });

    const userCi = await User.findOne({ where: { ci } });
    if (userCi)
      return res.status(400).json({ errors: ["User already exists"] });

    const PasswordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      ci,
      phone,
      email,
      password: PasswordHash,
    });

    const newCustomer = await Customer.create({
      userId: newUser.id,
    });

    res.json({
      id: newCustomer.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      ci: newUser.ci,
      phone: newUser.phone,
      email: newUser.email,
      createdAt: newCustomer.createdAt,
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};
