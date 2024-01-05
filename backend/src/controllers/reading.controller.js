import { Hardware } from "../models/Hardware.js";
import { Reading } from "../models/Reading.js";

export const getReadings = async (req, res) => {
  try {
    const { id } = req.params;
    const hardware = await Hardware.findByPk(id, {
      include: [{ model: Reading }],
    });
    if (!hardware) res.status(404).json({ errors: ["Hardware not found"] });
    const readings = hardware.readings.map((reading) => ({
      consumption: reading.consumption,
      power: reading.power,
      tension: reading.tension,
      current: reading.current,
      powerFactor: reading.powerFactor,
      a: reading.a,
      b: reading.b,
      c: reading.c,
    }));
    res.json(readings);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createReading = async (mack, data) => {
  try {
    const hardware = await Hardware.findOne({ where: { mack } });
    const consumption = 0;
    const power = data.power;
    const tension = data.tension;
    const current = data.current;
    const powerFactor = data.powerFactor;
    const a = 0;
    const b = 0;
    const c = 0;
    const newReading = await Reading.create({
      consumption,
      power,
      tension,
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
