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
         // Log any errors to the console
        console.error("Error in login controller: ", error);
        // Send a 500 Internal Server Error response in case of an exception
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({
            name,
            email,
            password
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser, res);
            await newUser.save();

            return res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            })
        }else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in signup controller: ", error.message); // Log the error to the console
        return res.status(500).json({ error: "Internal server error" }); // Respond with a 500 status code and error message
    }
}

