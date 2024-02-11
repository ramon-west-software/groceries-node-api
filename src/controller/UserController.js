import express from "express";
import UserService from "../service/UserService.js";
import { validateToken } from "../util/AuthToken.js"

const userService = new UserService();
const router = express.Router();

// GET USER STORAGE_AREAS, CATEGORIES, AND GROCERY_ITEMS
router.get('/:userId', validateToken, async (req, res) => {
  let id = req.params.userId;
  let user = await userService.getUserData(id);
  res.json(user);
});

export default router;
