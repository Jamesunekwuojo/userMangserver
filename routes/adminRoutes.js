import express from "express";
import { createAdmin, loginAdmin, logout } from "../controller/adminController.js";


const router = express.Router();


router.post('/signup', createAdmin)

router.post('/login', loginAdmin )

router.delete('/logout', logout)

export default router