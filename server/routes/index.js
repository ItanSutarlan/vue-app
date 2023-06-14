const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./product");
const categoryRoutes = require("./category");
const authenticationHandler = require("../middlewares/authentication");
const pubRoutes = require("./pub");

const router = express.Router();

router.use("/", authRoutes);

router.use("/products", authenticationHandler, productRoutes);
router.use("/categories", categoryRoutes);

router.use("/pub", pubRoutes);

module.exports = router;
