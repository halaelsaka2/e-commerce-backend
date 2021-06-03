const express = require("express");
const router = express.Router();
const categoryController = require("../server/controller/category");
var { ensureAuthenticated, checkAuthorization, checkIfCategoryHaveSub } = require("../server/middlewares");

router.get("/", categoryController.getAllCategory);
router.post("/", ensureAuthenticated, checkAuthorization, categoryController.addCategory);

router.put("/", ensureAuthenticated, checkAuthorization, categoryController.editCategory);
router.delete(
  "/:id",
  ensureAuthenticated,
  checkAuthorization,
  checkIfCategoryHaveSub,
  categoryController.deleteCategory
);

module.exports = router;
