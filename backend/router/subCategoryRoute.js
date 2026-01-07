import express from "express";
import { upload } from "../middleware/upload.js";
import {
  addSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "../controller/subCategoryController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add",auth, upload.single("image"), addSubCategory);
router.get("/",auth, getSubCategories);
router.get("/edit/:id",auth, getSubCategoryById);
router.put("/edit/:id",auth, upload.single("image"), updateSubCategory);
router.delete("/:id",auth, deleteSubCategory);

export default router;
