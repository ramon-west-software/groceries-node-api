import express from "express";
import StorageAreaService from "../service/StorageAreaService.js";
import { validateToken } from "../util/AuthToken.js";

const storageAreaService = new StorageAreaService();
const router = express.Router();

router.post("/", validateToken, async (req, res) => {
  console.log("POST new storage area...");
  const storageDetails = await req.body;
  let storageArea = await storageAreaService.createStorageArea(storageDetails);
  res.json(storageArea);
});

export default router;
