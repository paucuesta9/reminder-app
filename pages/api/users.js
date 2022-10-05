import jwt from "jsonwebtoken";

export default function login(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
      const token = jwt.sign(
        {
          username: "admin",
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
