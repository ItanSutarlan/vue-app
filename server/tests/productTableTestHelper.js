/* istanbul ignore file */
const { Product } = require("../models");

class ProductTableTestHelper {
  static addProducts(products) {
    return Product.bulkCreate(products);
  }

  static cleanTable() {
    return Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = ProductTableTestHelper;
