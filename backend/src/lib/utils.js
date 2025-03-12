import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.MY_CUSTOM_JWT_KEY;
const node_mode = process.env.NODE_ENV;

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // ms
    httpOnly: true, //xss attack
    sameSite: "strict", // csrf attack
    secure: node_mode !== "development",
  });

  console.log("Token generated ans cookies:");

  return token;
};
