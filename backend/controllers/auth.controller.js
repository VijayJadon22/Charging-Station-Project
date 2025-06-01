import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        generateTokenAndSetCookie(user, res);

        return res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name
        });

    } catch (error) {
        console.log("Error in login controller function: ", error);
    }
}

export const signup = async (req, res) => {
    try {

    } catch (error) {

    }
}

