// index.js
import express from "express";
import cors from "cors";
import LoginController from "./src/controller/LoginController.js";
import RegisterController from "./src/controller/RegisterController.js";
import UserController from "./src/controller/UserController.js";
import StorageAreaController from "./src/controller/StorageAreaController.js";
import CategoryController from "./src/controller/CategoryController.js";
// import ItemController from "./src/controller/ItemController.js";

// initialize app and dependencies
const app = express();

app.use(cors());
app.use(express.json());

// Mounting controllers
app.use(process.env.LOGIN_ENDPOINT, LoginController);
app.use(process.env.REGISTER_ENDPOINT, RegisterController);
app.use(process.env.USER_DATA_ENDPOINT, UserController);
app.use(process.env.STORAGE_ENDPOINT, StorageAreaController);
app.use(process.env.CATEGORY_ENDPOINT, CategoryController);
// app.use(process.env.ITEM_ENDPOINT, ItemController);

// Global API ENDPOINTS
app.listen(process.env.PORT, () => {
  console.log(`Welcome, listening on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.json("Hello groceries user!");
});
