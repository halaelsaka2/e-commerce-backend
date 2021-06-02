const express = require("express");
const router = express.Router();
const userController = require("../server/controller/user");
var { ensureAuthenticated } = require("../server/middlewares");

router.post("/", ensureAuthenticated, userController.addUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/", ensureAuthenticated, userController.getAllUsers);
router.put("/editUser", ensureAuthenticated, userController.editUser);
module.exports = router;
