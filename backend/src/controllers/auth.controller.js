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
          attributes: ["id", "admin"],
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
      return res.status(404).json({ errors: ["User not found"] });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(404).json({ errors: ["Password incorrect"] });
    }

    const id = userFound.employee
      ? userFound.employee.id
      : userFound.customer.id;
    const data = {
      id: id,
      email: userFound.email,
    };

    if (userFound.employee) {
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
    if (!token)
      return res.status(401).json({ errors: ["Authentication failed"] });

    jwt.verify(token, process.env.APP_TOKEN_SECRET, async (err, user) => {
      if (err)
        return res.status(401).json({ errors: ["Authentication failed"] });

      const userFound = await User.findOne({
        where: { id: user.id },
        attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        include: [
          {
            model: Employee,
            where: { staff: true },
            attributes: ["id", "admin"],
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
        return res.status(404).json({ errors: ["Authentication failed"] });
      }

      const id = userFound.employee
        ? userFound.employee.id
        : userFound.customer.id;
      const data = {
        id: id,
        email: userFound.email,
      };

      if (userFound.employee) {
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
    let userFound = await Employee.findOne({
      where: { id: req.user.id },
      include: [{ model: User }],
    });
    if (!userFound) {
      userFound = await Customer.findOne({
        where: { id: req.user.id },
        include: [{ model: User }],
      });
      console.log(userFound);
      if (!userFound)
        return res.status(404).json({ errors: ["User not found"] });
    }
    const isMatch = await bcrypt.compare(oldPassword, userFound.user.password);
    if (!isMatch)
      return res.status(500).json({ errors: ["Password incorrect"] });
    const PasswordHash = await bcrypt.hash(newPassword, 10);
    userFound.user.password = PasswordHash;
    userFound.user.save();
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

export const updateProfileAdmin = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email } = req.body;
    const employee = await employee.findOne({
      where: { id: req.user.id },
      attributes: ["id", "userId"],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const updateProfileCustomer = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email } = req.body;
    const customer = await Customer.findOne({
      where: { id: req.user.id },
      attributes: ["id", "userId"],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { firstName, lastName, ci, phone, email } = req.body;
//     const user = await User.findOne({
//       where: { id: req.user.id },
//       attributes: ["id", "admin", "personId"],
//     });
//     if (!user) return res.status(400).json({ errors: ["User not found"] });
//     const person = await Person.findOne({ where: { id: user.personId } });
//     person.firstName = firstName;
//     person.lastName = lastName;
//     person.ci = ci;
//     person.phone = phone;
//     person.email = email;
//     await person.save();
//     const userFound = await User.findOne({
//       where: { id: req.user.id },
//       attributes: ["id", "admin"],
//       include: [
//         {
//           model: Person,
//           attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
//         },
//       ],
//     });
//     res.json(userFound);
//   } catch (error) {
//     res.status(500).json({ errors: [error.message] });
//   }
// };

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
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};
