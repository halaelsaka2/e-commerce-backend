const express = require("express");
const router = express.Router();
const productController = require("../server/controller/product");
var { ensureAuthenticated, checkAuthorization } = require("../server/middlewares");

router.post("/", ensureAuthenticated, checkAuthorization, productController.addProduct);
router.get("/:page", productController.getAllProducts);
router.get("/getBySubId/:subId", productController.getProductsBySubId);
router.put("/", ensureAuthenticated, checkAuthorization, productController.editProduct);
router.delete("/:id", ensureAuthenticated, checkAuthorization, productController.deleteProduct);

module.exports = router;
