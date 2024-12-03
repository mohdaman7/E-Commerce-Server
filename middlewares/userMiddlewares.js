import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; // Extract Authorization header
    console.log(authHeader, "Authorization Header");
    
    if (!authHeader) {
      return res.status(403).json({ message: "Token not provided" });
    }
    
    // Split "Bearer <token>" to get the token part
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Token format invalid" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized, token invalid or expired" });
      }

      req.email = decode.email; // Attach user email from token payload
      next(); // Pass control to the next middleware
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Server error during token verification" });
  }
};
