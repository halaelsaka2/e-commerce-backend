const express = require("express");
const router = express.Router();
const subController = require("../server/controller/subCategory");
var { ensureAuthenticated, checkIfProductInSubCat } = require("../server/middlewares");

router.post("/", ensureAuthenticated, subController.addSubCategory);
router.get("/", subController.getAllSubCategories);
router.put("/", ensureAuthenticated, subController.editSubCategory);
router.delete("/:id", ensureAuthenticated, checkIfProductInSubCat, subController.deleteSubCategory);

module.exports = router;
