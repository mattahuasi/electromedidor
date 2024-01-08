import { User, Employee } from "../models/User.js";
import bcrypt from "bcryptjs";

export const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email, password, staff, admin } =
      req.body;
    const userEmail = await Employee.findOne({
      include: [{ model: User, where: { email } }],
    });
    if (userEmail)
      return res.status(400).json({ errors: ["Email already exists"] });
    const userCi = await Employee.findOne({
      include: [{ model: User, where: { ci } }],
    });
    if (userCi) return res.status(400).json({ errors: ["CI already exists"] });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      ci,
      phone,
      email,
      password: passwordHash,
    });
    const newEmployee = await Employee.create({
      staff,
      admin,
      userId: newUser.id,
    });
    res.json({
      id: newEmployee.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      ci: newUser.ci,
      phone: newUser.phone,
      email: newUser.email,
      staff: newEmployee.staff,
      admin: newEmployee.admin,
      createdAt: newEmployee.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ["id", "admin", "staff", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    const data = employees.map((employee) => ({
      id: employee.id,
      firstName: employee.user.firstName,
      lastName: employee.user.lastName,
      ci: employee.user.ci,
      phone: employee.user.phone,
      email: employee.user.email,
      staff: employee.staff,
      admin: employee.admin,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    }));
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "ci", "phone", "email"],
        },
      ],
    });
    if (!employee) return res.status(404).json({ errors: ["User not found"] });
    res.json({
      id: employee.id,
      firstName: employee.user.firstName,
      lastName: employee.user.lastName,
      ci: employee.user.ci,
      phone: employee.user.phone,
      email: employee.user.email,
      staff: employee.staff,
      admin: employee.admin,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, ci, phone, email, staff, admin } = req.body;
    const employee = await Employee.findByPk(id, {
      attributes: ["id", "staff", "admin", "userId"],
    });
    if (!employee) return res.status(404).json({ errors: ["User not found"] });
    const userEmail = await Employee.findOne({
      include: [{ model: User, where: { email } }],
    });
    if (userEmail && employee.userId != userEmail.userId)
      return res.status(400).json({ errors: ["Email already exists"] });
    const userCi = await Employee.findOne({
      include: [{ model: User, where: { ci } }],
    });
    if (userCi && employee.userId != userCi.userId)
      return res.status(400).json({ errors: ["CI already exists"] });
    const user = await User.findByPk(employee.userId);
    user.firstName = firstName;
    user.lastName = lastName;
    if (user.ci != ci) user.ci = ci;
    user.phone = phone;
    user.email = email;
    employee.staff = staff;
    employee.admin = admin;
    await Promise.all([user.save(), employee.save()]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) return res.status(404).json({ errors: ["User not found"] });
    const user = await User.findByPk(employee.userId);
    await Promise.all([await employee.destroy(), await user.destroy()]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
