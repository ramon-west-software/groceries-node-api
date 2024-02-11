import express from "express";
import CategoryService from "../service/CategoryService.js";
import { validateToken } from "../util/AuthToken.js";

const categoryService = new CategoryService();
const router = express.Router();

router.post("/", validateToken, async (req, res) => {
  console.log("POST new category...");
  const { storageId, name } = await req.body;
  let category = await categoryService.createCategory(
    storageId,
    name
  );
  res.json(category);
});

export default router;
