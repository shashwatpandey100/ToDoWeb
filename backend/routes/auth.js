import express from "express";
import { register, login, logout, isLoggedIn } from "../controllers/auth.js";
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    message: 'Too many login attempts, please try again later.',
});

const router = express.Router();

router.post("/register", register); 
router.post('/login', loginLimiter, login);
router.post("/logout", logout); 
router.post("/isLoggedIn", isLoggedIn); 

export default router;