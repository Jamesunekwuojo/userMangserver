import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Extract token from cookies

    console.log("Token middleware:", token)

    if (!token) {
        console.log("Access denied, no token")
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user info (e.g., user ID) to request
    console.log("Auth user", req.user)

    next(); // Move to the next middleware
  } catch (err) {
    console.log("Error in auth middleware", err)
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};


