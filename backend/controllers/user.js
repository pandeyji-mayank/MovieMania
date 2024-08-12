import User from '../models/userModel.js'
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