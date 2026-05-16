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



                    res
                        .cookie("token", token, {
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



module.exports = {
    signupUser,
};