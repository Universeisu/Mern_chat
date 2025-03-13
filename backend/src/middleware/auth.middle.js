import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized No Token Provider" });
    }
    const decoded = jwt.verify(token, process.env.MY_CUSTOM_JWT_KEY);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Unauthorized - Token Invalid" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error While checking token" });
  }
};
