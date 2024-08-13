import { addMovieToFav, getMoviebyUser, Login, Logout, Register, removeMovieFromFav, verifytoken } from "../controllers/user.js";
import express from 'express';

const router = express.Router();


router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);
router.post('/addmovietofav', verifytoken, addMovieToFav);
router.get('/getmovie', verifytoken, getMoviebyUser);
router.post('/removefromfav', verifytoken, removeMovieFromFav);

export default router;