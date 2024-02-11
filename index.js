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
const secretKey = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

// validate incoming JWT tokens for requests
const validateToken = async (req, res, next) => {
  console.log('validating token: ');
  // get token from request header
  const token = await req.header(process.env.REQUEST_TOKEN_HEADER);
  // if no token is present, return error
  if (!token) {
    return res.status(401).json({ message: "Missing token." });
  }
  // if token is present, verify validity and decode
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Mounting controllers
app.use(process.env.LOGIN_ENDPOINT, LoginController);
app.use(process.env.REGISTER_ENDPOINT, RegisterController);
app.use(process.env.USER_DATA_ENDPOINT, validateToken, UserController);
// app.use('/storage', validateToken, StorageAreaController);
// app.use('/category', validateToken, CategoryController);
// app.use('/item', validateToken, ItemController);

// API ENDPOINTS
app.listen(process.env.PORT, () => {
  console.log(`Welcome, listening on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.json("Hello groceries user!");
});

export { validateToken };