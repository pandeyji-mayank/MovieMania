import { Login, Logout, Register } from "../controllers/user.js";
import express from 'express';

const router = express.Router();


router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);


export default router;