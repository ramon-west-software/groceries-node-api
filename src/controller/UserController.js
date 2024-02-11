// UserController.js
import express from "express";
import UserService from "../service/UserService.js";
import { validateToken } from "../../index.js";

const userService = new UserService();
const router = express.Router();

// GET USER STORAGE_AREAS, CATEGORIES, AND GROCERY_ITEMS
router.get('/:userId', validateToken, async (req, res) => {
  validateToken;
  let id = await req.params.userId;
  let user = await userService.getUserData(id);
  res.json(user);
});

export default router;
