const { User } = require("../models");
const TokenManager = require("../helpers/tokenManager");

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw new Error("InvalidTokenError");
    }

    const { id } = TokenManager.verifyToken(access_token);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("InvalidTokenError");
    }

    req.user = {
      id: user.id,
      role: user.role,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};
