const express = require("express");
const wishlistController = require("../../controllers/wishlist");

const router = express.Router();

router.get("/", wishlistController.getMyWishlist);
router.post("/", wishlistController.postProductToWishlist);
router.delete(
  "/:productId",
  wishlistController.deleteProductFromWishlistByProductId
);

module.exports = router;
