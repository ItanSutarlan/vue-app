const jwt = require("jsonwebtoken");

class TokenManager {
  static generateToken({ id, email }) {
    return jwt.sign({ id, email }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "1d",
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  }
}

module.exports = TokenManager;
