const express = require("express");
const router = express.Router();
const roleController = require("../server/controller/role");
var { ensureAuthenticated, checkIfUserHaveRole } = require("../server/middlewares");

router.post("/", ensureAuthenticated, roleController.addRole);
router.get("/",  roleController.getAllRoles);
router.put("/", ensureAuthenticated, roleController.editRole);
router.delete("/:id", ensureAuthenticated, checkIfUserHaveRole, roleController.deleteRole);
module.exports = router;
