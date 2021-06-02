const express = require("express");
const router = express.Router();
const productController = require("../server/controller/product");
var { ensureAuthenticated } = require("../server/middlewares");

router.post("/", ensureAuthenticated, productController.addProduct);
router.get("/:page", productController.getAllProducts);
router.get("/getBySubId/:subId", productController.getProductsBySubId);
router.put("/", ensureAuthenticated, productController.editProduct);
router.delete("/:id", ensureAuthenticated, productController.deleteProduct);

module.exports = router;
