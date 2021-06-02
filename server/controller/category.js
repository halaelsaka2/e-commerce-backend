const { category } = require("../models");

async function addCategory(req, res) {
  category
    .addCategory(req.body)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function getAllCategory(req, res) {
  category
    .getAllCategory()
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function editCategory(req, res) {
  category
    .editCategory(req.body)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function deleteCategory(req, res) {
  await category
    .deleteCategory(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}

module.exports = {
  addCategory,
  getAllCategory,
  deleteCategory,
  editCategory,
};
