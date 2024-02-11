import express from "express";
import ItemService from "../service/ItemService.js";
import { validateToken } from "../util/AuthToken.js";

const itemService = new ItemService();
const router = express.Router();

router.post("/", validateToken, async (req, res) => {
  console.log("POST new grocery item...");
  const itemDetails = await req.body;
  let item = await itemService.createItem(itemDetails);
  res.json(item);
});

export default router;
