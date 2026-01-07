import SubCategory from "../model/SubCategory.js";
import Counter from "../model/Counter.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* Generate incremental ID */
const getNextSubCategoryId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "subCategoryId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

/* ADD SUB CATEGORY */
export const addSubCategory = async (req, res) => {
  try {
    const { name, category, status } = req.body;

    if (!name || !category || !req.file) {
      return res.status(400).json({ message: "All fields required" });
    }

    const subCategoryId = await getNextSubCategoryId();

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "digitalflake/subcategories" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    const subCategory = await SubCategory.create({
      subCategoryId,
      name,
      category,
      status,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });

    res.status(201).json({
      message: "Sub Category added successfully",
      subCategory,
    });
  } catch (err) {
    console.error("ADD SUBCATEGORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL SUB CATEGORIES */
export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate("category", "name")
      .sort({ subCategoryId: 1 });

    res.status(200).json({
      message: "Sub Categories fetched",
      subCategories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET SINGLE SUB CATEGORY */
export const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id)
      .populate("category", "name");

    if (!subCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    res.status(200).json({ subCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE SUB CATEGORY */
export const updateSubCategory = async (req, res) => {
  try {
    const { name, category, status } = req.body;
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    if (req.file) {
      if (subCategory.image?.public_id) {
        await cloudinary.uploader.destroy(subCategory.image.public_id);
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "digitalflake/subcategories" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      subCategory.image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    subCategory.name = name ?? subCategory.name;
    subCategory.category = category ?? subCategory.category;
    subCategory.status = status ?? subCategory.status;

    await subCategory.save();

    res.status(200).json({
      message: "Sub Category updated",
      subCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE SUB CATEGORY */
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    if (subCategory.image?.public_id) {
      await cloudinary.uploader.destroy(subCategory.image.public_id);
    }

    await subCategory.deleteOne();

    res.status(200).json({ message: "Sub Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
