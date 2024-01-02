import { Person, User } from "../models/Person.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "admin", "createdAt", "updatedAt"],
      include: [
        {
          model: Person,
          attributes: ["firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    if (!user) return res.status(404).json({ errors: ["User not found"] });
    const data = {
      id: user.id,
      firstName: user.person.firstName,
      lastName: user.person.lastName,
      ci: user.person.ci,
      phone: user.person.phone,
      email: user.person.email,
      admin: user.admin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "admin", "createdAt", "updatedAt"],
      include: [
        {
          model: Person,
          attributes: ["firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    const data = users.map((user) => ({
      id: user.id,
      firstName: user.person.firstName,
      lastName: user.person.lastName,
      ci: user.person.ci,
      phone: user.person.phone,
      email: user.person.email,
      admin: user.admin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email, password, admin } = req.body;
    const userEmail = await User.findOne({
      include: [{ model: Person, where: { email } }],
    });
    if (userEmail)
      return res.status(400).json({ errors: ["Email already exists"] });
    const userCi = await User.findOne({
      include: [{ model: Person, where: { ci } }],
    });
    if (userCi) return res.status(400).json({ errors: ["CI already exists"] });
    const hash = await bcrypt.hash(password, 10);
    const newPerson = await Person.create({
      firstName,
      lastName,
      ci,
      phone,
      email,
    });
    const newUser = await User.create({
      password: hash,
      admin,
      personId: newPerson.id,
    });
    const data = {
      id: newUser.id,
      firstName: newPerson.firstName,
      lastName: newPerson.lastName,
      ci: newPerson.ci,
      phone: newPerson.phone,
      email: newPerson.email,
      password: newUser.password,
      admin: newUser.admin,
      createdAt: newUser.createdAt,
    };
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, ci, phone, email, admin } = req.body;
    const user = await User.findByPk(id, {
      attributes: ["id", "admin", "personId"],
    });
    if (!user) return res.status(404).json({ errors: ["User not found"] });
    const userEmail = await User.findOne({
      include: [{ model: Person, where: { email } }],
    });
    if (userEmail && user.personId != userEmail.personId)
      return res.status(400).json({ errors: ["Email already exists"] });
    const userCi = await User.findOne({
      include: [{ model: Person, where: { ci } }],
    });
    if (userCi && user.personId != userCi.personId)
      return res.status(400).json({ errors: ["CI already exists"] });
    const person = await Person.findByPk(user.personId);
    person.firstName = firstName;
    person.lastName = lastName;
    if (person.ci != ci) person.ci = ci;
    person.phone = phone;
    person.email = email;
    user.admin = admin;
    await Promise.all([person.save(), user.save()]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ errors: ["User not found"] });
    const person = await Person.findByPk(user.personId);
    await Promise.all([user.destroy(), person.destroy()]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
