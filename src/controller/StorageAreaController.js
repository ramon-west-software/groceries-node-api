import express from "express";
import StorageAreaService from "../service/StorageAreaService.js";
import { validateToken } from "../util/AuthToken.js";

const storageAreaService = new StorageAreaService();
const router = express.Router();

router.post("/", validateToken, async (req, res) => {
  console.log("POST new storage area...");
  const { userId, name } = await req.body;
  let storageArea = await storageAreaService.createStorageArea(
    userId,
    name
  );
  res.json(storageArea);
});

export default router;
