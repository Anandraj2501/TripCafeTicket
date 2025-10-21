import { User } from "../models/user.model.js"; // Adjust path as needed
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Review } from "../models/review.model.js";

const signup = async (req, res) => {
    try {
        // Destructure the input from the request body
        const { username, email, isAdmin, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email, phone or Password is missing" });
        }

        // Check if a user with the same email or phone already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email or phone already exists" });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password,
            isAdmin: isAdmin || false, // Defaults to false if not provided
        });

        // Save the user in the database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // consoleerror("Error in signup:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                username: user.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )

        // Authentication successful
        res.cookie("accessToken", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
            }

        });
    } catch (error) {
        // consoleerror("Error in login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const submitReview = async (req, res) => {
    try {
        const { categories, comment, username, email } = req.body;

        const review = new Review({ categories, comment, username, email });
        await review.save();

        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const getReview = async (req, res) => {
    try {
        const review = await Review.find({}).sort({ createdAt: -1 });
        if (!review) {
            return res.status(404).json({ message: 'No reviews found',reviews: [] });
        }

        res.status(201).json({ message: 'Review submitted successfully', reviews: review });
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}


export { signup, login, submitReview, getReview };
