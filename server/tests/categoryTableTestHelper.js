/* istanbul ignore file */
const { Category } = require("../models");

class CategoryTableTestHelper {
  static addCategories(categories) {
    return Category.bulkCreate(categories);
  }

  static cleanTable() {
    return Category.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = CategoryTableTestHelper;
