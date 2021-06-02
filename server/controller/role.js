const { role } = require("../models");

async function addRole(req, res) {
  const obj = {
    name: req.body.name,
  };
  role
    .addRole(obj)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function getAllRoles(req, res) {
  await role
    .getAllRoles()
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}

async function editRole(req, res) {
  let roleObj = req.body;
  role
    .editRole(roleObj)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function deleteRole(req, res) {
  await role
    .deleteRole(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
module.exports = {
  addRole,
  getAllRoles,
  editRole,
  deleteRole,
};
