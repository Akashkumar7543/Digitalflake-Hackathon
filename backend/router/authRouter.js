import express from "express";
import { Router } from "express";
import { register, userLogin } from "../controller/userController.js";

const router = Router();

router.post("/login", userLogin);
router.post("/register", register);

export default router;