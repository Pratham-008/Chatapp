import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function generateToken(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV !== process.env.NODE_ENV,
    sameSite: "strict",
  });
  return token;
}
