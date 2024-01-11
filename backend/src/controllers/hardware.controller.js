import { Hardware } from "../models/Hardware.js";

export const createHardware = async (req, res) => {
  try {
    const { name, address, key, area, customerId } = req.body;
    const hardware = await Hardware.findOne({ where: { name } });
    if (hardware)
      return res.status(400).json({ errors: ["Hardware already exists"] });
    const newHardware = await Hardware.create({
      name,
      address,
      key,
      area,
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
      name: item.name,
      address: item.address,
      key: item.key,
      area: item.area,
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
    const { name, address, key, area, customerId } = req.body;
    const hardware = await Hardware.findByPk(id);
    if (!hardware) return res.status(404).json("Hardware not found");
    const nameHardware = await Hardware.findOne({ where: { name } });
    if (nameHardware && hardware.id != nameHardware.id)
      return res.status(400).json({ errors: ["Hardware already exists"] });
    if (name != hardware.name) hardware.name = name;
    hardware.address = address;
    hardware.key = key;
    hardware.area = area;
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

export const getHardwareMQTT = async () => {
  try {
    const hardware = await Hardware.findAll();
    return hardware;
  } catch (error) {
    return error;
  }
};
