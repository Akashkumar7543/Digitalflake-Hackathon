import Category from "../model/Category.js";
import Counter from "../model/Counter.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import mongoose from "mongoose";
/* helper */
const getNextCategoryId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "categoryId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

export const addCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ message: "All fields required" });
    }

    const categoryId = await getNextCategoryId();

    // ✅ CORRECT CLOUDINARY UPLOAD (STREAM)
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "digitalflake/categories",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    const category = await Category.create({
      categoryId,
      name,
      status: status || "Active",
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (err) {
    console.error("ADD CATEGORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { name, status } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Replace image if new file uploaded
    if (req.file) {
      if (category.image?.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "digitalflake/categories",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      category.image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    category.name = name || category.name;
    category.status = status || category.status;

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    console.error("UPDATE CATEGORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ categoryId: 1 });

    res.status(200).json({
      message: "Categories fetched successfully",
      count: categories.length,
      categories,
    });
  } catch (err) {
    console.error("GET CATEGORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE CATEGORY
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Prevent CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category id",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  } catch (err) {
    console.error("GET CATEGORY BY ID ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete image from Cloudinary
    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(
        category.image.public_id
      );
    }

    await category.deleteOne();

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error("DELETE CATEGORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
