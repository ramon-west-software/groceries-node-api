// index.js
import express from "express";
import cors from "cors";
import LoginController from "./src/controller/LoginController.js"
import RegisterController from "./src/controller/RegisterController.js"
import UserController from "./src/controller/UserController.js";
// import StorageAreaController from "./StorageAreaController.js";
// import CategoryController from "./CategoryController.js";
// import ItemController from "./ItemController.js";

// initialize app and dependencies
const app = express();

app.use(cors());
app.use(express.json());


// Mounting controllers
app.use(process.env.LOGIN_ENDPOINT, LoginController);
app.use(process.env.REGISTER_ENDPOINT, RegisterController);
app.use(process.env.USER_DATA_ENDPOINT, UserController);
// app.use('/storage', validateToken, StorageAreaController);
// app.use('/category', validateToken, CategoryController);
// app.use('/item', validateToken, ItemController);

// Global API ENDPOINTS
app.listen(process.env.PORT, () => {
  console.log(`Welcome, listening on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.json("Hello groceries user!");
});
