const { Wishlist, Product } = require("../models");

class WishlistController {
  static async postProductToWishlist(req, res, next) {
    try {
      const { productId } = req.body;
      const { id: customerId } = req.customer;
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("NotFoundError");
      }
      await Wishlist.create({
        productId,
        customerId,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Product successfully added to wishlist",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductFromWishlistByProductId(req, res, next) {
    try {
      const { productId } = req.params;
      const { id: customerId } = req.customer;
      const wishlist = await Wishlist.destroy({
        where: {
          productId,
          customerId,
        },
      });

      if (!wishlist) {
        throw new Error("NotFoundError");
      }

      res.status(200).json({
        statusCode: 200,
        message: `Product with id ${productId} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyWishlist(req, res, next) {
    try {
      const { id: customerId } = req.customer;
      const myWishList = await Wishlist.findAll({
        where: {
          customerId,
        },
        include: {
          model: Product,
        },
      });

      res.status(200).json({
        statusCode: 200,
        data: myWishList,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WishlistController;
