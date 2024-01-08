import { Hardware } from "../models/Hardware.js";
import { Reading } from "../models/Reading.js";

export const createReading = async (mack, data) => {
  try {
    const hardware = await Hardware.findOne({ where: { mack } });
    if (!hardware) return console.log("Hardwares doesn't exist");
    let consumption = 0;
    const power = parseFloat(data.potencia);
    const voltage = parseFloat(data.voltaje);
    const current = parseFloat(data.corriente);
    const powerFactor = parseFloat(data.factorPotencia);
    if (data.consumo) consumption = parseFloat(data.consumo);
    const newReading = await Reading.create({
      power,
      voltage,
      current,
      powerFactor,
      consumption,
      hardwareId: hardware.id,
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const getReadingsById = async (req, res) => {
  try {
    const { id } = req.params;
    const hardware = await Hardware.findByPk(id, {
      include: [{ model: Reading }],
    });
    if (!hardware)
      return res.status(404).json({ errors: ["Hardware not found"] });
    const readings = hardware.readings.map((reading) => ({
      id: reading.id,
      power: reading.power,
      voltage: reading.voltage,
      current: reading.current,
      powerFactor: reading.powerFactor,
      consumption: reading.consumption,
      hardwareId: hardware.id,
      createdAt: reading.createdAt,
    }));
    res.json(readings);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
