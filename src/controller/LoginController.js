// AuthController.js
import express from "express";
import AuthService from "../service/AuthService.js";
import UserService from "../service/UserService.js";
import jwt from "jsonwebtoken";

const authService = new AuthService();
const userService = new UserService();
const secretKey = process.env.SECRET_KEY;
const router = express.Router();

//  POST LOGIN - generate JWT
router.post('/', async (req, res) => {
  const { email, password } = await req.body;
  // validate user exists in database
  let authUser = await authService.authenticateUser([email, password]);
  if (authUser) {
    // generate token
    const payload = {
      userid: authUser.user_id,
      username: authUser.user_name,
      data: "json object for user data",
    };
    const options = {
      expiresIn: "1h",
      algorithm: "HS256",
    };
    const token = jwt.sign(payload, secretKey, options);
    // return token
    res.status(200).json({ token, userId: `${authUser.user_id}` });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});
export default router;
