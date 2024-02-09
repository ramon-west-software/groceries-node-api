import express from "express";
import UserService from "./src/service/UserService.js";
import StorageAreaService from "./src/service/StorageAreaService.js";
import CategoryService from "./src/service/CategoryService.js";
import ItemService from "./src/service/ItemService.js";
import cors from "cors";
import jwt from "jsonwebtoken";

// initialize app and dependencies
const app = express();
const userService = new UserService();
const storageAreaService = new StorageAreaService();
const categoryService = new CategoryService();
const itemService = new ItemService();
const secretKey = process.env.SECRET_KEY;
app.use(cors());
app.use(express.json());

// validate incoming JWT tokens for requests
const validateToken = async (req, res, next) => {
  // get token from request header
  const token = await req.header(process.env.REQUEST_TOKEN_HEADER);
  // if no token is present, return error
  if (!token) {
    return res.status(401).json({ "message": "Missing token." });
  }
  // if token is present, verify validity and decode
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ "message": "Invalid token." });
  }
};

// API ENDPOINTS
app.listen(process.env.PORT, () => {
  console.log(`Welcome, listening on port ${process.env.PORT}`);
});

// USER ENDPOINTS:
//  POST REGISTER NEW USER - returns user_id
app.post(process.env.REGISTER_ENDPOINT, async (req, res) => {
  const { username, email, password } = await req.body;
  // check if user exists
  const userExists = await userService.authenticateUser([email, password]);
  if (userExists) {
    res
      .status(401)
      .json({ message: "Invalid Credentials, user already exists." });
  } else {
    const newUserId = await userService.createUser([
      username,
      email,
      password,
    ]);
    if (newUserId) {
      res
        .status(201)
        .json({ message: `User ${username} successfully created!`, userId: `${newUserId}` });
    } else {
      res.status(500).json({ "message": "Unable to create User" });
    }
  }
});

//  POST LOGIN - generate JWT
app.post(process.env.LOGIN_ENDPOINT, async (req, res) => {
  const { email, password } = await req.body;
  // validate user exists in database
  let authUser = await userService.authenticateUser([email, password]);
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

app.get("/", (req, res) => {
  res.json("Hello groceries user!");
});

// PROTECTED ENDPOINTS
// GET USER STORAGE_AREAS, CATEGORIES, AND GROCERY_ITEMS
app.get(process.env.GET_USER_DATA_ENDPOINT, validateToken, async (req, res) => {
  let id = req.params.userId;
  let user = await userService.getUserData(id);
  res.json(user);
});

// GET STORAGE AREA BY ID
app.get(process.env.GET_STORAGE_ENDPOINT, validateToken, async (req, res) => {
  let id = req.params.storageId;
  let storageArea = await storageAreaService.getStorageArea(id);
  res.json(storageArea);
});
// GET ALL STORAGE AREAS BY USER_ID
app.get(
  process.env.GET_USER_STORAGE_ENDPOINT,
  validateToken,
  async (req, res) => {
    let userId = req.params.userId;
    let storageAreas = await storageAreaService.getStorageAreasByUserId(userId);
    res.json(storageAreas);
  }
);

// EDIT STORAGE AREA BY ID
// POST NEW STORAGE AREA
app.post(process.env.STORAGE_ENDPOINT, validateToken, async (req, res) => {
  const storageArea = await req.body;
  const response = await storageAreaService.createStorageArea(storageArea);
  res.json(response);
});

// GET CATEGORY BY ID
// EDIT CATEGORY BY ID
// POST NEW CATEGORY
app.post(process.env.CATEGORY_ENDPOINT, validateToken, async (req, res) => {
  const category = await req.body;
  const response = await categoryService.createCategory(category);
  res.json(response);
});

// GET ITEM BY ID
// EDIT ITEM BY ID
// POST NEW ITEM
app.post(process.env.ITEM_ENDPOINT, validateToken, async (req, res) => {
  const item = await req.body;
  const response = await itemService.createItem(item);
  res.json(response);
});
