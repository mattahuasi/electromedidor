import { Hardware } from "../models/Hardware.js";
import { Reading } from "../models/Reading.js";

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

export const createReadingMQTT = async (name, reading) => {
  try {
    const hardware = await Hardware.findOne({ where: { name } });
    if (!hardware) return console.log("Hardwares doesn't exist");
    if (hardware.key) {
      const power = parseFloat(reading.potencia);
      const voltage = parseFloat(reading.voltaje);
      const current = parseFloat(reading.corriente);
      const powerFactor = parseFloat(reading.factorPotencia);
      const consumption = parseFloat(reading.consumo);
      const newReading = await Reading.create({
        power,
        voltage,
        current,
        powerFactor,
        consumption,
        hardwareId: hardware.id,
      });
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};
