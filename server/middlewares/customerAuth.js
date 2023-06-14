const { Customer } = require("../models");
const TokenManager = require("../helpers/tokenManager");

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw new Error("InvalidTokenError");
    }

    const { id } = TokenManager.verifyToken(access_token);
    const user = await Customer.findByPk(id);
    if (!user) {
      throw new Error("InvalidTokenError");
    }

    req.customer = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};
