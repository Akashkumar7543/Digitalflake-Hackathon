import express from "express";
import { upload } from "../middleware/upload.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controller/categoryController.js";
import auth from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/add", auth, upload.single("image"), addCategory);
route.get("/",auth, getCategories);
route.get("/edit/:id",auth, getCategoryById);
route.delete("/:id",auth, deleteCategory);
route.put("/edit/:id",auth, upload.single("image"), updateCategory);

export default route;
