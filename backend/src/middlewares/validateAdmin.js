import { User } from "../models/Person.js";

export const adminRequired = async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findOne({ where: { id, admin: true } });
  if (!user)
    return res.status(401).json({ errors: ["authorization admin Required"] });
  next();
};
