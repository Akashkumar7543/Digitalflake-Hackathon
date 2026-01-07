import mongoose from "mongoose";
import Product from "../model/Product.js";
import SubCategory from "../model/SubCategory.js";
import Counter from "../model/Counter.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Category from "../model/Category.js";

/* AUTO PRODUCT ID */
const getNextProductId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "productId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

/* ================= ADD PRODUCT ================= */

export const addProduct = async (req, res) => {
  try {
    const { name, category, subCategory, status } = req.body;

    if (!name || !category || !subCategory) {
      return res.status(400).json({
        message: "Name, category and subcategory are required",
      });
    }

    const productId = await getNextProductId();

    // 🔹 Fetch subcategory
    const subCat = await SubCategory.findById(subCategory);
    if (!subCat) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    // 🔹 Fetch category (fallback)
    const cat = await Category.findById(category);

    // ✅ IMAGE SOURCE LOGIC
    const imageSource =
      subCat.image?.url
        ? subCat.image
        : cat?.image;

    const product = await Product.create({
      productId,
      name,
      category,
      subCategory,
      status: status || "Active",
      image: imageSource, // ✅ AUTO IMAGE
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort({ productId: 1 });

    res.status(200).json({
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET PRODUCT BY ID ================= */

export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const product = await Product.findById(id)
    .populate("category", "name")
    .populate("subCategory", "name");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ product });
};


/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  try {
    const { name, status, subCategory } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    /* 🔹 SUBCATEGORY CHANGE → AUTO UPDATE CATEGORY & IMAGE */
    if (subCategory) {
      const subCat = await SubCategory
        .findById(subCategory)
        .populate("category", "image");

      if (!subCat) {
        return res.status(404).json({ message: "SubCategory not found" });
      }

      product.subCategory = subCat._id;
      product.category = subCat.category._id;

      product.image =
        subCat.image?.url
          ? subCat.image
          : subCat.category?.image || product.image;
    }

    /* 🔹 IMAGE UPLOAD (OVERRIDES AUTO IMAGE) */
    if (req.file) {
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "digitalflake/products" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      product.image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    product.name = name ?? product.name;
    product.status = status ?? product.status;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });

  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
