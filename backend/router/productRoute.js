import express from "express";
import { upload } from "../middleware/upload.js";
import auth from "../middleware/authMiddleware.js";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

router.get("/",auth, getProducts);
router.get("/productsByID/:id", auth, getProductById);
router.put(
  "/edit/:id",
  auth,
  upload.single("image"), 
  updateProduct
);

router.post("/add",auth, addProduct);
router.delete("/:id",auth, deleteProduct);

export default router;
