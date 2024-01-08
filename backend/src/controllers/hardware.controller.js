import { User, Customer } from "../models/User.js";
import { Hardware } from "../models/Hardware.js";

export const createHardware = async (req, res) => {
  try {
    const { mack, address, status, key, urban, rural, customerId } = req.body;
    const mackHardware = await Hardware.findOne({ where: { mack } });
    if (mackHardware)
      return res.status(400).json({ errors: ["Hardware already exists"] });
    const newHardware = await Hardware.create({
      mack,
      address,
      status,
      key,
      urban,
      rural,
      customerId: customerId,
    });
    res.json(newHardware);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getHardware = async (req, res) => {
  try {
    const hardware = await Hardware.findAll();
    const data = hardware.map((item) => ({
      id: item.id,
      mack: item.mack,
      address: item.address,
      status: item.status,
      key: item.key,
      urban: item.urban,
      rural: item.rural,
      customerId: item.customerId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getHardwareById = async (req, res) => {
  try {
    const { id } = req.params;
    const hardware = await Hardware.findByPk(id);
    if (!hardware) return res.status(404).json("Hardware not found");
    res.json(hardware);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateHardwareById = async (req, res) => {
  try {
    const { id } = req.params;
    const { mack, address, status, key, urban, rural, customerId } = req.body;
    const hardware = await Hardware.findByPk(id);
    if (!hardware) return res.status(404).json("Hardware not found");
    const mackHardware = await Hardware.findOne({ where: { mack } });
    if (mackHardware && hardware.id != mackHardware.id)
      return res.status(400).json({ errors: ["Hardware already exists"] });
    if (mack != hardware.mack) hardware.mack = mack;
    hardware.address = address;
    hardware.status = status;
    hardware.key = key;
    hardware.urban = urban;
    hardware.rural = rural;
    hardware.customerId = customerId;
    await hardware.save();
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const deleteHardwareById = async (req, res) => {
  try {
    const { id } = req.params;
    const hardware = await Hardware.findByPk(id);
    if (!hardware)
      return res.status(404).json({ errors: ["Hardware not found"] });
    await hardware.destroy();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

// export const getHardware = async (req, res) => {
//   try {
//     const hardware = await Hardware.findAll({
//       include: [
//         {
//           model: Customer,
//           include: [
//             { model: Person, attributes: ["firstName", "lastName", "email"] },
//           ],
//         },
//         { model: Category, attributes: ["id", "name", "initialism"] },
//       ],
//     });
//     console.log(hardware);
//     const data = hardware.map((item) => ({
//       id: item.id,
//       mack: item.mack,
//       address: item.address,
//       status: item.status,
//       key: item.key,
//       urban: item.urban,
//       rural: item.rural,
//       customerId: item.customer.id,
//       firstName: item.customer.person.firstName,
//       lastName: item.customer.person.lastName,
//       email: item.customer.person.email,
//       categoryId: item.category.id,
//       category: item.category.name,
//       initialism: item.category.initialism,
//       createdAt: item.createdAt,
//       updatedAt: item.updatedAt,
//     }));
//     console.log(data);
//     res.json(data);
//   } catch (error) {
//     return res.status(500).json({ errors: [error] });
//   }
// };

// export const getHardwareById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const hardware = await Hardware.findByPk(id, {
//       include: [
//         {
//           model: Customer,
//           include: [
//             { model: Person, attributes: ["firstName", "lastName", "email"] },
//           ],
//         },
//         { model: Category, attributes: ["id", "name", "initialism"] },
//       ],
//     });
//     if (!hardware)
//       return res.status(404).json({ errors: ["Hardware not found"] });
//     res.json(hardware);
//   } catch (error) {
//     return res.status(500).json({ errors: [error] });
//   }
// };

// export const createHardware = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { mack, address, status, key, urban, rural, categoryId } = req.body;
//     const customerFound = await Customer.findByPk(id);
//     if (!customerFound)
//       return res.status(400).json({ errors: ["Customer not found"] });
//     const mackHardware = await Hardware.findOne({ where: { mack } });
//     if (mackHardware)
//       return res.status(400).json({ errors: ["Hardware already exists"] });
//     const newHardware = await Hardware.create({
//       mack,
//       address,
//       status,
//       key,
//       urban,
//       rural,
//       customerId: customerFound.id,
//       categoryId,
//     });
//     res.json(newHardware);
//   } catch (error) {
//     return res.status(500).json({ errors: [error] });
//   }
// };

// export const updateHardware = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { mack, address, status, key, urban, rural } = req.body;
//     const hardware = await Hardware.findByPk(id);
//     if (!hardware)
//       return res.status(404).json({ errors: ["Hardware not found"] });
//     const mackHardware = await Hardware.findOne({ where: { mack } });
//     if (mackHardware && hardware.id != mackHardware.id)
//       return res.status(400).json({ errors: ["Hardware already exists"] });
//     if (mack != hardware.mack) hardware.mack = mack;
//     hardware.address = address;
//     hardware.status = status;
//     hardware.key = key;
//     hardware.urban = urban;
//     hardware.rural = rural;
//     await hardware.save();
//     res.sendStatus(204);
//   } catch (error) {
//     return res.status(500).json({ errors: [error] });
//   }
// };

// export const deleteHardware = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const hardware = await Hardware.findByPk(id);
//     if (!hardware)
//       return res.status(404).json({ errors: ["Hardware not found"] });
//     await hardware.destroy();
//     return res.sendStatus(204);
//   } catch (error) {
//     return res.status(500).json({ errors: [error] });
//   }
// };
