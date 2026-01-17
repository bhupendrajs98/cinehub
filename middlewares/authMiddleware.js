import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*  LOGIN REQUIRED */
export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      return next(); // Proceed to next middleware or controller
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    console.error("Protect middleware error:", error);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

/*  ADMIN ONLY */
export const adminOnly = (req, res, next) => {
  try {
    if (req.user?.role === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "Admin access only" });
    }
  } catch (error) {
    console.error("AdminOnly middleware error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
