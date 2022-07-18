const Category = require("../model/categoryModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        es.status(500).json({ msg: "This category already exists." });
      const newCategory = await Category({ name });
      await newCategory.save();
      res.json({ msg: "Created a category" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a category" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Update a category" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
