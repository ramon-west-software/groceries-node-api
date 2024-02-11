// AuthController.js
import express from "express";
import AuthService from "../service/AuthService.js";
import UserService from "../service/UserService.js";

const authService = new AuthService();
const userService = new UserService();
const router = express.Router();

//  POST REGISTER NEW USER - returns user_id
router.post("/", async (req, res) => {
  const { username, email, password } = await req.body;
  // check if user exists
  let userExists = await authService.authenticateUser([email, password]);
  if (userExists) {
    res
      .status(401)
      .json({ message: "Invalid Credentials, user already exists." });
  } else {
    const newUserId = await userService.createUser([username, email, password]);
    if (newUserId) {
      res.status(201).json({
        message: `User ${username} successfully created!`,
        userId: `${newUserId}`,
      });
    } else {
      res.status(500).json({ message: "Unable to create User" });
    }
  }
});

export default router;
