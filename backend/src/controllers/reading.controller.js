import { Hardware } from "../models/Hardware.js";
import { Reading } from "../models/Reading.js";

export const getReadings = async (req, res) => {
  try {
    const { id } = req.params;
    const hardware = await Hardware.findByPk(id, {
      include: [{ model: Reading }],
    });
    if (!hardware)
      return res.status(404).json({ errors: ["Hardware not found"] });
    const readings = hardware.readings.map((reading) => ({
      consumption: reading.consumption,
      power: reading.power,
      voltage: reading.voltage,
      current: reading.current,
      powerFactor: reading.powerFactor,
      a: reading.a,
      b: reading.b,
      c: reading.c,
      createdAt: reading.createdAt,
    }));
    res.json(readings);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createReading = async (mack, data) => {
  try {
    const hardware = await Hardware.findOne({ where: { mack } });
    if (!hardware) return console.log("Hardwares doesn't exist");
    let consumption = 0;
    if (data.consumo) consumption = parseFloat(data.consumo);
    const power = parseFloat(data.potencia);
    const voltage = parseFloat(data.voltaje);
    const current = parseFloat(data.corriente);
    const powerFactor = parseFloat(data.factorPotencia);
    let a = 0;
    if (data.a) a = parseFloat(data.a);
    let b = 0;
    if (data.b) b = parseFloat(data.b);
    let c = 0;
    if (data.c) c = parseFloat(data.c);
    const newReading = await Reading.create({
      consumption,
      power,
      voltage,
      current,
      powerFactor,
      a,
      b,
      c,
      hardwareId: hardware.id,
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
