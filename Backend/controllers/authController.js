const db = require("../config/db");

const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");



const signupUser = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }


    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Server error",
                });
            }


            if (result.length > 0) {
                return res.status(400).json({
                    message: "User already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const sql =
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            db.query(
                sql,
                [name, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        console.log(err);

                        return res.status(500).json({
                            message: "Error creating user",
                        });
                    }

                    const token = generateToken(result.insertId);

                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    })
                        .status(201)
                        .json({
                            message: "User created successfully",
                        });
                }
            );
        }
    );
};



const loginUser = (req, res) => {

    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Server error",
                });
            }

            if (result.length === 0) {
                return res.status(400).json({
                    message: "Invalid email or password",
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid email or password",
                });
            }

            const token = generateToken(user.id);

            res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                .status(200)
                .json({
                    message: "Login successful",
                });
        }
    );
};





const logoutUser = (req, res) => {

    res
        .clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .status(200)
        .json({
            message: "Logged out successfully",
        });
};




const getMe = (req, res) => {

    res.status(200).json({
        userId: req.user,
    });
};





module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    getMe,
};