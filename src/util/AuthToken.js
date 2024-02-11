import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

// validate incoming JWT tokens for requests
const validateToken = async (req, res, next) => {
  console.log("validating token... ");
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
    console.log("token validated!");
    next();
  } catch (error) {
    console.log("token not validated!");
    return res.status(401).json({ message: "Invalid token." });
  }
};

export { validateToken };
