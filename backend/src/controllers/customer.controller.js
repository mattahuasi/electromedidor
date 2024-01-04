import { Person, Customer } from "../models/Person.js";
import { Category } from "../models/Category.js";
import { Hardware } from "../models/Hardware.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({ include: [{ model: Person }] });
    const data = customers.map((customer) => ({
      id: customer.id,
      firstName: customer.person.firstName,
      lastName: customer.person.lastName,
      ci: customer.person.ci,
      phone: customer.person.phone,
      email: customer.person.email,
      createdAt: customer.person.createdAt,
      updatedAt: customer.person.updatedAt,
    }));
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      include: [{ model: Person }],
    });
    if (!customer)
      return res.status(404).json({ errors: ["Customer not found"] });
    const data = {
      id: customer.id,
      firstName: customer.person.firstName,
      lastName: customer.person.lastName,
      ci: customer.person.ci,
      phone: customer.person.phone,
      email: customer.person.email,
      createdAt: customer.person.createdAt,
      updatedAt: customer.person.updatedAt,
    };
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, ci, phone, email } = req.body;
    const personEmail = await Person.findOne({ where: { email } });
    if (personEmail)
      return res.status(400).json({ errors: ["Email already exists"] });
    const personCi = await Person.findOne({ where: { ci } });
    if (personCi)
      return res.status(400).json({ errors: ["CI already exists"] });
    const newPerson = await Person.create({
      firstName,
      lastName,
      ci,
      phone,
      email,
    });
    const newCustomer = await Customer.create({ personId: newPerson.id });
    const data = {
      id: newCustomer.id,
      firstName,
      lastName,
      ci,
      phone,
      email,
      createdAt: newCustomer.createdAt,
    };
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, ci, phone, email } = req.body;
    const customer = await Customer.findByPk(id, {
      include: [{ model: Person }],
    });
    if (!customer)
      return res.status(404).json({ errors: ["Customer not found"] });
    const personEmail = await Person.findOne({ where: { email } });
    if (personEmail && customer.personId != personEmail.id)
      return res.status(400).json({ errors: ["Email already exists"] });
    const personCi = await Person.findOne({ where: { ci } });
    if (personCi && customer.personId != personCi.id)
      return res.status(400).json({ errors: ["CI already exists"] });
    const person = await Person.findByPk(customer.personId);
    person.firstName = firstName;
    person.lastName = lastName;
    if (person.ci != ci) person.ci = ci;
    person.phone = phone;
    person.email = email;
    await person.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      include: [{ model: Person }],
    });
    if (!customer)
      return res.status(404).json({ errors: ["Customer not found"] });
    const person = await Person.findByPk(customer.personId);
    await Promise.all([customer.destroy(), person.destroy()]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getCustomerHardware = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      include: [
        {
          model: Hardware,
          attributes: [
            "id",
            "mack",
            "address",
            "status",
            "key",
            "urban",
            "rural",
            "createdAt",
          ],
          include: [{ model: Category, attributes: ["id", "name"] }],
        },
      ],
    });
    const data = customer.hardware.map((item) => ({
      id: item.id,
      mack: item.mack,
      address: item.address,
      category: item.category.name,
      status: item.status,
      key: item.key,
      urban: item.urban,
      rural: item.rural,
      createdAt: item.createdAt,
    }));
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
