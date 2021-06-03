const express = require("express");
const router = express.Router();
const subController = require("../server/controller/subCategory");
var { ensureAuthenticated,checkAuthorization, checkIfProductInSubCat } = require("../server/middlewares");

router.post("/", ensureAuthenticated, checkAuthorization, subController.addSubCategory);
router.get("/", subController.getAllSubCategories);
router.put("/", ensureAuthenticated, checkAuthorization, subController.editSubCategory);
router.delete(
  "/:id",
  ensureAuthenticated,
  checkAuthorization,
  checkIfProductInSubCat,
  subController.deleteSubCategory
);

module.exports = router;
