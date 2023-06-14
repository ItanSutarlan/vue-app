const axios = require("axios");
const { Op } = require("sequelize");
const { Product, User, History } = require("../models");

class ProductController {
  static async postProduct(req, res, next) {
    try {
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const { id, username } = req.user;

      const product = await Product.create({
        name,
        description,
        price: +price,
        stock: +stock,
        imgUrl,
        categoryId: +categoryId,
        authorId: +id,
      });

      const User = await product.getUser({
        attributes: {
          exclude: ["password"],
        },
      });

      await History.create({
        name: product.name,
        description: `New product with id ${product.id} created`,
        updatedBy: username,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Product created successfully",
        data: {
          ...product.toJSON(),
          User,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProducts(req, res, next) {
    const { filter, page } = req.query;
    const paramQuerySQL = {};

    let limit;
    let offset;

    // filter
    if (filter !== "" && typeof filter !== "undefined") {
      const query = filter.category
        .split(",")
        .map((item) => ({ [Op.eq]: item }));

      paramQuerySQL.where = {
        categoryId: {
          [Op.or]: query,
        },
      };
    }

    // pagination
    if (page !== "" && typeof page !== "undefined") {
      if (page.size !== "" && typeof page.size !== "undefined") {
        limit = page.size;
        paramQuerySQL.limit = limit;
      }

      if (page.number !== "" && typeof page.number !== "undefined") {
        offset = page.number * limit - limit;
        paramQuerySQL.offset = offset;
      }
    }

    try {
      paramQuerySQL.include = {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      };

      const { count, rows: products } = await Product.findAndCountAll(
        paramQuerySQL
      );

      res.status(200).json({
        statusCode: 200,
        count,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductHistories(_, res, next) {
    try {
      const histories = await History.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        statusCode: 200,
        data: histories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: {
          id,
        },
      });

      if (!product) {
        throw new Error("NotFoundError");
      }

      const baseUrl =
        process.env.NODE_ENV !== "production"
          ? "http://localhost:5173"
          : process.env.BASE_URL;

      const url = `${baseUrl}/${id}`;

      const { data: barcode } = await axios({
        method: "post",
        url: `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_API_KEY}`,
        data: {
          frame_name: "no-frame",
          qr_code_text: url,
          image_format: "SVG",
          background_color: "#ffffff",
          foreground_color: "#fa6e79",
          marker_right_inner_color: "#2d7cda",
          marker_right_outer_color: "#00bfff",
          marker_left_template: "version11",
          marker_right_template: "version11",
          marker_bottom_template: "version11",
        },
      });

      res.status(200).json({
        statusCode: 200,
        data: {
          ...product.toJSON(),
          barcode,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async patchProductStatusById(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error("NotFoundError");
      }
      const prevStatus = product.status;

      product.set({ status });

      await product.save({ fields: ["status"] });

      const { username } = req.user;

      await History.create({
        name: product.name,
        description: `Product status with id ${id} has been updated from ${prevStatus} into ${status}`,
        updatedBy: username,
      });

      res.status(200).json({
        statusCode: 200,
        message: `Product status with id ${id} updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async putProductById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const products = await Product.update(
        {
          name,
          description,
          price: +price,
          stock: +stock,
          imgUrl,
          categoryId: +categoryId,
        },
        {
          where: {
            id,
          },
        }
      );

      if (!products[0]) {
        throw new Error("NotFoundError");
      }

      const { username } = req.user;
      await History.create({
        name,
        description: `Product with id ${id} updated`,
        updatedBy: username,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Product updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.destroy({
        where: {
          id,
        },
      });

      if (!product) {
        throw new Error("NotFoundError");
      }

      res.status(200).json({
        statusCode: 200,
        message: `Product ${id} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
