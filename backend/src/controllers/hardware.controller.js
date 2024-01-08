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
