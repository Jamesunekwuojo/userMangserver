import express from "express";
import { checkAuth } from "../controller/authController.js";

const router = express.Router()

router.get('/', checkAuth)


export default router