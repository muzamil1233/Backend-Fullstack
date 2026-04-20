const authorize = async (req, res, next) => {
  try {
    // ✅ Safe check before .split()
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" }); // 401 not 404
  }
};