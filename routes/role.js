const express = require("express");
const router = express.Router();
const roleController = require("../server/controller/role");
var { ensureAuthenticated, checkAuthorization, checkIfUserHaveRole } = require("../server/middlewares");

router.post("/", ensureAuthenticated, checkAuthorization, roleController.addRole);
router.get("/", roleController.getAllRoles);
router.put("/", ensureAuthenticated, checkAuthorization, roleController.editRole);
router.delete("/:id", ensureAuthenticated, checkAuthorization, checkIfUserHaveRole, roleController.deleteRole);
module.exports = router;
