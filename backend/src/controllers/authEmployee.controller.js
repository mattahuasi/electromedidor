import { User, Employee, Customer } from "../models/User.js";
import { createdAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await Employee.findOne({
      where: { staff: true },
      attributes: ["id", "staff", "admin"],
      include: {
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
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });

    const isMatch = await bcrypt.compare(password, userFound.user.password);
    if (!isMatch)
      return res.status(403).json({ errors: ["Password incorrect"] });

    const token = await createdAccessToken({ id: userFound.id });

    res.json({
      user: {
        id: userFound.id,
        firstName: userFound.user.firstName,
        lastName: userFound.user.lastName,
        ci: userFound.user.ci,
        phone: userFound.user.phone,
        email: userFound.user.email,
        staff: userFound.staff,
        admin: userFound.admin,
      },
      token: token,
    });
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

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ errors: ["Unauthorized"] });

    jwt.verify(token, process.env.APP_TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ errors: ["Unauthorized"] });

      const userFound = await Employee.findOne({
        where: { id: user.id, staff: true },
        attributes: ["id", "staff", "admin"],
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        },
      });
      if (!userFound)
        return res.status(404).json({ errors: ["User not found"] });

      res.json({
        user: {
          id: userFound.id,
          firstName: userFound.user.firstName,
          lastName: userFound.user.lastName,
          ci: userFound.user.ci,
          phone: userFound.user.phone,
          email: userFound.user.email,
          staff: userFound.staff,
          admin: userFound.admin,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email } = req.body;

    const employee = await Employee.findOne({
      where: { id: req.user.id },
      attributes: ["id", "userId"],
    });
    if (!employee) return res.status(404).json({ errors: ["User not found"] });

    const user = await User.findOne({
      where: { id: employee.userId },
      attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
    });

    user.firstName = firstName;
    user.lastName = lastName;
    user.ci = ci;
    user.phone = phone;
    user.email = email;

    await user.save();

    const userFound = await Employee.findOne({
      where: { id: req.user.id },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
      },
    });

    res.sendStatus(200);

    // res.json({
    //   user: {
    //     id: userFound.id,
    //     firstName: userFound.user.firstName,
    //     lastName: userFound.user.lastName,
    //     ci: userFound.user.ci,
    //     phone: userFound.user.phone,
    //     email: userFound.user.email,
    //     staff: userFound.staff,
    //     admin: userFound.admin,
    //   },
    // });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, repeatPassword } = req.body;

    if (newPassword !== repeatPassword)
      return res.status(400).json({ errors: ["Passwords don't match"] });

    const userFound = await Employee.findOne({
      where: { id: req.user.id },
      include: { model: User },
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });

    const isMatch = await bcrypt.compare(oldPassword, userFound.user.password);

    if (!isMatch)
      return res.status(403).json({ errors: ["Password incorrect"] });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    userFound.user.password = passwordHash;

    await userFound.user.save();

    res.sendStatus(200);

    // res.json({
    //   user: {
    //     id: userFound.id,
    //     firstName: userFound.user.firstName,
    //     lastName: userFound.user.lastName,
    //     ci: userFound.user.ci,
    //     phone: userFound.user.phone,
    //     email: userFound.user.email,
    //     staff: userFound.staff,
    //     admin: userFound.admin,
    //   },
    // });
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
