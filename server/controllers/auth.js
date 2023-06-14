const { OAuth2Client } = require("google-auth-library");
const { User, Customer } = require("../models");
const PasswordHash = require("../helpers/passwordHash");
const TokenManager = require("../helpers/tokenManager");
const GoogleAuth = require("../helpers/googleAuth");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "Admin",
      });

      res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
        data: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("AuthenticationError");
      }

      const isMatch = PasswordHash.compare(password, user.password);
      if (!isMatch) {
        throw new Error("AuthenticationError");
      }

      const access_token = TokenManager.generateToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Login succeed",
        data: {
          access_token,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogleWithCredential(req, res, next) {
    try {
      const { credential } = req.body;
      const userInfo = await GoogleAuth.verifyCredentials(credential);

      const [user, created] = await User.findOrCreate({
        where: {
          email: userInfo.email,
        },
        defaults: {
          username: userInfo.email.split("@")[0],
          email: userInfo.email,
          password: userInfo.sub.toString(),
          role: "Staff",
        },
      });

      const access_token = TokenManager.generateToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Login succeed",
        data: {
          access_token,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogleWithAccessToken(req, res, next) {
    try {
      const { token } = req.body;

      const userInfo = await GoogleAuth.verifyToken(token);

      const [user, created] = await User.findOrCreate({
        where: {
          email: userInfo.email,
        },
        defaults: {
          username: userInfo.email.split("@")[0],
          email: userInfo.email,
          password: userInfo.sub.toString(),
          role: "Staff",
        },
      });

      const access_token = TokenManager.generateToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Login succeed",
        data: {
          access_token,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async registerCustomer(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Customer.create({
        email,
        password,
      });

      res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
        data: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("AuthenticationError");
      }

      const isMatch = PasswordHash.compare(password, user.password);
      if (!isMatch) {
        throw new Error("AuthenticationError");
      }

      const access_token = TokenManager.generateToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Login succeed",
        data: {
          access_token,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogleCustomerWithCredential(req, res, next) {
    try {
      const { credential } = req.body;
      const userInfo = await GoogleAuth.verifyCredentials(credential);

      const [user, created] = await Customer.findOrCreate({
        where: {
          email: userInfo.email,
        },
        defaults: {
          email: userInfo.email,
          password: userInfo.sub.toString(),
        },
      });

      const access_token = TokenManager.generateToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Login succeed",
        data: {
          access_token,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
