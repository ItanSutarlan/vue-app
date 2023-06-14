const { Product } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("NotFoundError");
    }

    const { id: authorId, role } = req.user;
    if (
      role === "Admin" ||
      (role === "Staff" && product.authorId === authorId)
    ) {
      next();
    } else {
      throw new Error("AuthorizationError");
    }
  } catch (error) {
    next(error);
  }
};
