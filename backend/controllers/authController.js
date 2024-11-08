import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    try {
        const isValidUsername = (username) => {
            return /^[a-zA-Z0-9_]+$/.test(username);
        };

        let { name, username, email, password, authMethod } = req.body;

        username = username.replace(/\s+/g, '').toLowerCase();
        password = password.trim();

        if (!name || !username || !email || !password || !authMethod) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        if (!isValidUsername(username)) {
            return res.status(400).send({ message: "Invalid username format", success: false });
        }

        const user = await User.findOne({ username, authMethod: "email" });
        if (user) {
            return res.status(409).json({ message: "User already exists. Please login instead.", success: false });
        }

        if (/\s/.test(password)) {
            return res.status(400).send({ message: "Password should not contain spaces", success: false });
        }
        if (password.length < 4) {
            return res.status(400).json({ message: "Password must be at least 4 characters long", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            authMethod: "email",
            name,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "Signup successful",
            success: true,
            data: {
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const login = async (req, res) => {
    try {
        let { username, password } = req.body;

        username = username.replace(/\s+/g, '').toLowerCase();
        password = password.trim();

        const user = await User.findOne({ username });
        const errorMessage = 'User not found. Please sign up or enter a valid username and password.';

        if (!user) {
            return res.send({ message: errorMessage, success: false, code: 403 });
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.send({ message: "Incorrect password", success: false, code: 403 });
        }

        const jwtToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        user.lastLogin = new Date();
        await user.save();

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.send({
            message: "Login successful",
            success: true,
            code: 200,
            data: user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.send({ message: "Internal Server Error", success: false, code: 500 });
    }
};

const logout = (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true, // Secure the cookie by marking it HTTPOnly
        secure: process.env.NODE_ENV === "production", // If in production, set to true for HTTPS
        sameSite: "strict", // Prevent CSRF attacks
      });
  
      // If using token stored on client-side (localStorage/sessionStorage), the client needs to remove it.
      res.status(200).json({
        message: "Logged out successfully",
        success: true,
      });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };

export { signup, login, logout};
