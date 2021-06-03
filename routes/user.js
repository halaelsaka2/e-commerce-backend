const express = require("express");
const router = express.Router();
const userController = require("../server/controller/user");
var { ensureAuthenticated, checkAuthorization } = require("../server/middlewares");

router.post("/", ensureAuthenticated, checkAuthorization, userController.addUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/", ensureAuthenticated, checkAuthorization, userController.getAllUsers);
router.put("/editUser", ensureAuthenticated, checkAuthorization, userController.editUser);
module.exports = router;
