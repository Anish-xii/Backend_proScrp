import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Could not create category", error });
  }
};

// ... add deleteCategory or updateCategory as needed
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting category", error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Error updating category", error });
  }
};