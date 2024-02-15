const slugify = require("slugify");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const orderModel = require("../models/orderModel");
const path = require("path");
const Razorpay = require("razorpay");
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID_RAZORPAY,
    key_secret: process.env.KEY_SECRET_RAZORPAY,
  });


// create product
exports.createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    const photo = req.file.filename;

    if (!photo) {
      return res.status(400).send({ message: "Photo is required" });
    }

    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is Required" });
      case !description:
        return res.status(500).send({ message: "Description is Required" });
      case !price:
        return res.status(500).send({ message: "Price is Required" });
      case !category:
        return res.status(500).send({ message: "Select a Category" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is Required" });
    }

    // Create product with slugified name
    const slug = slugify(name);
    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      photo,
      slug,
    });

    // Save product to database
    const data = await newProduct.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in creating product",
    });
  }
};

// update product
exports.updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }
    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Create product with slugified name
    const slug = slugify(name);
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        price,
        category,
        quantity,
        shipping,
        slug,
        ...(photo && { photo }),
      },
      { new: true }
    );

    // Save product to database
    await products.save();

    res.status(201).send({
      success: true,
      message: "Product details updated successfully",
      product: products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in updating product",
    });
  }
};

// get all product
exports.getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All products",
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

// get single product
exports.getSingleProductController = async (req, res) => {
  try {
    const products = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photos")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product fetched",
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

// get photo
exports.productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (!product.photo) {
      return res.status(404).send({
        success: false,
        message: "Product photo not found",
      });
    }
    res.set("Content-Type", "image/jpeg");
    res.sendFile(path.join(__dirname, "..", "uploads", product.photo));
    
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in getting product photo",
      error,
    });
  }
};

// delete product
exports.deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

// Filter Products
exports.productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    if (checked.length > 0) {
      args.category = checked;
    }

    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await productModel.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in filtering product",
      error,
    });
  }
};

// product count
exports.productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};

// product list base on page
exports.productListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};

// search product
exports.searchProductController = async (req, res) => {
  const keywords = req.params.keywords;
  try {
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keywords, $options: "i" } },
          { description: { $regex: keywords, $options: "i" } },
        ],
      })
      .select("-photo");

    res.json(results);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in search product",
      error,
    });
  }
};

// related products
exports.relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in search related products",
      error,
    });
  }
};

// category wise products from headers
exports.productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      slug: req.params.slug,
    });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      products,
      category,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

// payment
exports.paymentController = async (req, res) => {
  try {
    const cart  = req.body.cart;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let order  =await razorpay.orders.create({
        amount: total *100, 
        currency: "INR",
      });
      res.status(201).send({
        success: true,
        message :"Payment success",
        order
      });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in payment",
      error,
    });
  }
};

// Order add
exports.orderController = async (req, res) => {
    try {
      const cart = req.body.cart;
      const paymentDetails = req.body.paymentDetails;
      if (!cart || cart.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty"
        });
      }
  
      if (!paymentDetails) {
        return res.status(400).json({
          success: false,
          message: "Payment details are required"
        });
      }
  
      const order = new orderModel({
        products: cart,
        payment: paymentDetails,
        buyer: req.user._id
      });
  
      const savedOrder = await order.save();
      res.status(200).json({
        success: true,
        message: "Order placed successfully",
        order: savedOrder
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  };