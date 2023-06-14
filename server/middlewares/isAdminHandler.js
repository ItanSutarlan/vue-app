module.exports = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Admin") {
      next();
    } else {
      throw new Error("AuthorizationError");
    }
  } catch (error) {
    next(error);
  }
};
