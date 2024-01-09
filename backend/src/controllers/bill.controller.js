import { Bill } from "../models/Bill.js";

export const createBill = async (req, res) => {
  try {
    const { consumption, cost, status, customerId, hardwareId } = req.body;
    const newBill = await Bill.create({
      consumption,
      cost,
      status,
      customerId,
      hardwareId,
    });
    res.json(newBill);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    const data = bills.map((bill) => ({
      id: bill.id,
      consumption: bill.consumption,
      cost: bill.cost,
      status: bill.status,
      customerId: bill.customerId,
      hardwareId: bill.hardwareId,
      createdAt: bill.createdAt,
      updatedAt: bill.updatedAt,
    }));
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findByPk(id);
    if (!bill) return res.status(404).json({ errors: ["Bill not found"] });
    res.json(bill);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const bill = await Bill.findByPk(id);
    if (!bill) return res.status(404).json({ errors: ["Bill not found"] });
    bill.status = status;
    await bill.save();
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const deleteBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findByPk(id);
    if (!bill) return res.status(404).json({ errors: ["Bill not found"] });
    await bill.destroy();
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
