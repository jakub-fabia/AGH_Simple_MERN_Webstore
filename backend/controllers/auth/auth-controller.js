const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require('validator');
const User = require("../../models/user.js");
const dotenv  = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
    const {username, email, password } = req.body;
    try {
        if (!validator.isEmail(email))
            return res.join({
                success: false,
                message: "Email is not valid!"
            })
        const checkUser = await User.findOne({ email });
        if (checkUser)
            return res.json({
                success: false,
                message: "User Already exists with the same email! Please try again",
            });
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successful",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser)
            return res.json({
                success: false,
                message: "User doesn't exist! Please register first",
            });

        const checkPasswordMatch = await bcrypt.compare(
            password,
            checkUser.password
        );
        if (!checkPasswordMatch)
            return res.json({
                success: false,
                message: "Incorrect password! Please try again",
            });

        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                username: checkUser.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: "60m" }
        );

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                username: checkUser.username,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!",
    });
};

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };