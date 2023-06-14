const express = require("express");
const ProductController = require("../controllers/product");
const authorizationHandler = require("../middlewares/authorization");
const isAdminHandler = require("../middlewares/isAdminHandler");
const router = express.Router();

router.post("/", ProductController.postProduct);
router.get("/", ProductController.getProducts);
router.get("/histories", ProductController.getProductHistories);
router.get("/:id", ProductController.getProductById);
router.patch("/:id", isAdminHandler, ProductController.patchProductStatusById);
router.use("/:id", authorizationHandler);
router.put("/:id", ProductController.putProductById);
router.delete("/:id", ProductController.deleteProductById);

module.exports = router;
