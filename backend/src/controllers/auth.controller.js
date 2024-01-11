import { User, Employee, Customer } from "../models/User.js";
import { createdAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userFound = await Employee.findOne({
      where: { staff: true },
      attributes: ["id", "admin"],
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
    if (!userFound) {
      userFound = await Customer.findOne({
        attributes: ["id"],
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
      if (!userFound)
        return res.status(404).json({ errors: ["User not found"] });
      const isMatch = await bcrypt.compare(password, userFound.user.password);
      if (!isMatch)
        return res.status(404).json({ errors: ["Password incorrect"] });
      const token = await createdAccessToken({ id: userFound.id });
      res.json({
        id: userFound.id,
        email: userFound.user.email,
        user: {
          id: userFound.user.id,
          firstName: userFound.user.firstName,
          lastName: userFound.user.lastName,
          ci: userFound.user.ci,
          phone: userFound.user.phone,
        },
        token: token,
      });
    } else {
      const isMatch = await bcrypt.compare(password, userFound.user.password);
      if (!isMatch)
        return res.status(404).json({ errors: ["Password incorrect"] });
      const token = await createdAccessToken({ id: userFound.id });
      res.json({
        id: userFound.id,
        email: userFound.user.email,
        admin: userFound.admin,
        user: {
          id: userFound.user.id,
          firstName: userFound.user.firstName,
          lastName: userFound.user.lastName,
          ci: userFound.user.ci,
          phone: userFound.user.phone,
        },
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, repeatPassword } = req.body;
    if (newPassword !== repeatPassword)
      return res.status(500).json({ errors: ["Passwords don't match"] });
    const userFound = await User.findOne({ where: { id: req.user.id } });
    res.json(userFound.id);
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

// export const updatePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword, repeatPassword } = req.body;
//     const userFound = await User.findOne({ where: { id: req.user.id } });
//     if (newPassword !== repeatPassword)
//       return res.status(500).json({ errors: ["Passwords don't match"] });
//     if (!userFound) return res.status(404).json({ errors: ["User not found"] });
//     const isMatch = await bcrypt.compare(oldPassword, userFound.password);
//     if (!isMatch)
//       return res.status(500).json({ errors: ["Password incorrect"] });
//     const PasswordHash = await bcrypt.hash(newPassword, 10);
//     userFound.password = PasswordHash;
//     userFound.save();
//     res.json({ id: userFound.id });
//   } catch (error) {
//     res.status(500).json({ errors: [error.message] });
//   }
// };

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// export const profile = async (req, res) => {
//   try {
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
//     if (!userFound) return res.status(400).json({ errors: ["User not found"] });
//     res.json(userFound);
//   } catch (error) {
//     res.status(500).json({ errors: [error.message] });
//   }
// };

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ errors: ["Unauthorized"] });
    jwt.verify(token, process.env.APP_TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ errors: ["Unauthorized"] });
      let userFound = await Employee.findOne({
        where: { id: user.id },
        attributes: ["id", "admin"],
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
          },
        ],
      });
      if (!userFound) {
        userFound = await Customer.findOne({
          where: { id: user.id },
          attributes: ["id"],
          include: [
            {
              model: User,
              attributes: [
                "id",
                "firstName",
                "lastName",
                "ci",
                "phone",
                "email",
              ],
            },
          ],
        });
        if (!userFound)
          return res.status(401).json({ errors: ["Unauthorized"] });
        res.json(userFound);
      } else res.json(userFound);
    });
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

// export const register = async (req, res) => {
//   try {
//     const { firstName, lastName, ci, phone, email, password } = req.body;
//     const userEmail = await User.findOne({
//       include: [{ model: Person, where: { email } }],
//     });
//     if (userEmail)
//       return res.status(400).json({ errors: ["Email already exists"] });
//     const userCi = await User.findOne({
//       include: [{ model: Person, where: { ci } }],
//     });
//     if (userCi) return res.status(400).json({ errors: ["CI already exists"] });
//     const hash = await bcrypt.hash(password, 10);
//     const newPerson = await Person.create({
//       firstName,
//       lastName,
//       ci,
//       phone,
//       email,
//     });
//     const newUser = await User.create({
//       password: hash,
//       admin: false,
//       personId: newPerson.id,
//     });
//     const data = {
//       id: newUser.id,
//       email: newPerson.email,
//       password: newUser.password,
//     };
//     res.json(data);
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
