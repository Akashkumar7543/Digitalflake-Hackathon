import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, err => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    next();
  });
};

export default auth;
