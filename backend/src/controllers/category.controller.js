import { Category } from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    const data = categories.map((category) => ({
      id: category.id,
      name: category.name,
      initialism: category.initialism,
      minA: category.minA,
      maxA: category.maxA,
      minB: category.minB,
      maxB: category.maxB,
      minC: category.minC,
      maxC: category.maxC,
      priceA: category.priceA,
      priceB: category.priceB,
      priceC: category.priceC,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ errors: ["Category not found"] });
    const data = {
      id: category.id,
      name: category.name,
      initialism: category.initialism,
      minA: category.minA,
      maxA: category.maxA,
      minB: category.minB,
      maxB: category.maxB,
      minC: category.minC,
      maxC: category.maxC,
      priceA: category.priceA,
      priceB: category.priceB,
      priceC: category.priceC,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
    res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createCategory = async (req, res) => {
  try {
    const {
      name,
      initialism,
      minA,
      maxA,
      priceA,
      minB,
      maxB,
      priceB,
      minC,
      maxC,
      priceC,
    } = req.body;
    const categoryName = await Category.findOne({ where: { name } });
    if (categoryName)
      return res.status(400).json({ errors: ["Name already exist"] });
    const categoryInit = await Category.findOne({ where: { initialism } });
    if (categoryInit)
      return res.status(400).json({ errors: ["Initialism already exist"] });
    const newCategory = await Category.create({
      name,
      initialism,
      minA,
      maxA,
      priceA,
      minB,
      maxB,
      priceB,
      minC,
      maxC,
      priceC,
    });
    res.json(newCategory);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      initialism,
      minA,
      maxA,
      priceA,
      minB,
      maxB,
      priceB,
      minC,
      maxC,
      priceC,
    } = req.body;
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ errors: ["Category not found"] });
    const categoryName = await Category.findOne({ where: { name } });
    if (categoryName && category.id != categoryName.id)
      return res.status(400).json({ errors: ["Name already exist"] });
    const categoryInit = await Category.findOne({ where: { initialism } });
    if (categoryInit && category.id != categoryInit.id)
      return res.status(400).json({ errors: ["Initialism already exist"] });
    if (name != category.name) category.name = name;
    if (initialism != category.initialism) category.initialism = initialism;
    category.minA = minA;
    category.maxA = maxA;
    category.priceA = priceA;
    category.minB = minB;
    category.maxB = maxB;
    category.priceB = priceB;
    category.minC = minC;
    category.maxC = maxC;
    category.priceC = priceC;
    await category.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ errors: ["Category not found"] });
    await category.destroy();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
