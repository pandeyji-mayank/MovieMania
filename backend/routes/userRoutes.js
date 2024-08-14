import { addMovieToFav, addMovieToWatchlist, getMoviebyUser, getWatchList, Login, Logout, Register, removeMovieFromFav, removeWatchList, verifytoken } from "../controllers/user.js";
import express from 'express';

const router = express.Router();


router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);
// favorite
router.post('/addmovietofav', verifytoken, addMovieToFav);
router.get('/getmovie', verifytoken, getMoviebyUser);
router.post('/removefromfav', verifytoken, removeMovieFromFav);
// watchlist
router.post('/addwatchlist', verifytoken, addMovieToWatchlist);
router.get('/watchlist', verifytoken, getWatchList);
router.post('/removewatchlist', verifytoken, removeWatchList);

export default router;