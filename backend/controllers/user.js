import User from '../models/userModel.js'
import Movie from '../models/movieModel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password', success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }
        const users = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        };
        console.log(users);
        const token = jwt.sign({ id: user._id, name: user.fullName, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).cookie("token", token, { httponly: true }).json({ message: `Welcome Back ${user.fullName}`, user: users, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

export const Logout = async (req, res) => {
    return res.status(200).clearCookie("token").json({ message: "Logged Out Successfully", success: true });
}

export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please provide all fields', success: false });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ message: "This email has already used", success: false });
        }
        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = new User({ fullName, email, password: hashedPassword });
        newUser.save();
        return res.status(200).json({ message: "Account Created Successfully.", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
}
export const verifytoken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token);
        if (!token) {
            return res.status(403).json({ message: "Token is not provided", success: false });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "UnAuthorized", success: false });
            }
            req.userId = decoded.id;
            // console.log(req.userId);
            next();
        });
    }
    catch (error) {
        // console.log(res);
        return res.status(500).json({ message: error, success: false });
    }
}

export const getMoviebyUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not logged in", success: false });
        }
        return res.status(200).json({ message: "User's favorite movies", data: user.favourites, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

export const addMovieToFav = async (req, res) => {
    try {
        const userId = req.userId;
        const { movieId } = req.body;
        const user = await User.findOne({ _id: userId, favourites: { $in: [movieId] } });
        if (user) {
            return res.status(404).json({ message: "Movie already found in favorites", success: false });
        }
        await User.findByIdAndUpdate(userId, { $push: { favourites: movieId } });
        return res.status(200).json({ message: "Movie added in favorite list", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

export const removeMovieFromFav = async (req, res) => {
    try {
        const userId = req.userId;
        const { movieId } = req.body;
        const user = await User.findOne({ _id: userId, favourites: { $in: [movieId] } });
        if (!user) {
            return res.status(404).json({ message: "Movie not found in favorites", success: false });
        }
        // Remove the movieId from the favourites array
        await User.findByIdAndUpdate(userId, { $pull: { favourites: movieId } });
        return res.status(200).json({ message: "Movie removed from favorite list", success: true });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

export const addMovieToWatchlist = async (req, res) => {
    try {
        const userId = req.userId;
        const { movieId } = req.body;
        const user = await User.findOne({ _id: userId, watchlist: { $in: [movieId] } });
        if (user) {
            return res.status(404).json({ message: "Movie already found in watchlist", success: false });
        }
        await User.findByIdAndUpdate(userId, { $push: { watchlist: movieId } });
        return res.status(200).json({ message: "Movie added in watchlist", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error ", success: false });
    }
}