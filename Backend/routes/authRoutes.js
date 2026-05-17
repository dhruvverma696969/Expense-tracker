const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
  signupUser,
  loginUser,
  logoutUser,
  getMe,
} = require("../controllers/authController");



router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", authMiddleware, getMe);



module.exports = router;