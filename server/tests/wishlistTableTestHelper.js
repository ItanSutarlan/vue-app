/* istanbul ignore file */
const { Wishlist } = require("../models");

class WishlistTableTestHelper {
  static addWishlist({ customerId = 1, productId }) {
    return Wishlist.create({ customerId, productId });
  }

  static cleanTable() {
    return Wishlist.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = WishlistTableTestHelper;
