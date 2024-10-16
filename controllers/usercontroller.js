const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels"); // Ensure you have your User model set up correctly
const express = require("express");

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check if the user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Create user in the database
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created: ${user}`);
    
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET, // Make sure to use a secret key from environment variables
            { expiresIn: "15m " } // Token expiry time
        );

        res.status(200).json({
            accessToken,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// Get current user info
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user );
});

module.exports = { registerUser, loginUser, currentUser };
