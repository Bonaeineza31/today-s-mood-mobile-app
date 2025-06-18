export const authorizeRole = (roles) => {
  return (req, res, next) => {
    const user = req.user; // set by authentication middleware
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient permissions" });
    }
    next();
  };
};
