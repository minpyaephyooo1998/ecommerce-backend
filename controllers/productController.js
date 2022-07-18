const Products = require("../model/productModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; // queryString = req.query
    console.log({ before: queryObj }); // step 2 before delete page

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log({ after: queryObj }); //after delete

    let quretStr = JSON.stringify(queryObj);
    // console.log({ queryObj, quretStr });
    quretStr = quretStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    console.log({ quretStr });

    this.query.find(JSON.parse(quretStr));

    //gte = greater than or equal
    //lte = lesser than or equal
    //lt = lesser than
    //gt = greater than

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").json(" ");
      console.log(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  // getProducts: async (req, res) => {
  //   try {

  //     const products = await Products.find();

  //     res.json(products);
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },

  getProducts: async (req, res) => {
    try {
      console.log(req.query); //step 1
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;

      // const products = await Products.find();

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Product deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      res.json({ msg: "Update a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
