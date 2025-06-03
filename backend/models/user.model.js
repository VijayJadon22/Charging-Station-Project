import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be atleast 6 characters long"]
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password || "");
}

const User = mongoose.model("User", userSchema);
export default User;