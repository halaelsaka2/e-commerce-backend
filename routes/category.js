const express = require("express");
const router = express.Router();
const categoryController = require("../server/controller/category");
var { ensureAuthenticated, checkIfCategoryHaveSub } = require("../server/middlewares");

router.get("/", categoryController.getAllCategory);
router.post("/", ensureAuthenticated, categoryController.addCategory);

router.put("/", ensureAuthenticated, categoryController.editCategory);
router.delete("/:id", ensureAuthenticated, checkIfCategoryHaveSub, categoryController.deleteCategory);

module.exports = router;
