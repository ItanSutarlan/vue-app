const express = require("express");
const customerAuth = require("../../middlewares/customerAuth");
const authRoutes = require("./auth");
const productRoutes = require("./product");
const categoryRoutes = require("./category");
const wishlistRoutes = require("./wishlist");

const router = express.Router();

router.use("/", authRoutes);
router.use("/products", productRoutes);

router.use("/categories", categoryRoutes);

router.use(customerAuth);
router.use("/mywishlist", wishlistRoutes);

module.exports = router;
