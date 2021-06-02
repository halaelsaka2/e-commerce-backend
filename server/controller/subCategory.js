const { subCategory } = require("../models");

async function addSubCategory(req, res) {
  subCategory
    .addSubCategory(req.body)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}

async function getAllSubCategories(req, res) {
  subCategory
    .getAllSubCategories()
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function editSubCategory(req, res) {
  subCategory
    .editSubCategory(req.body)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function deleteSubCategory(req, res) {
  await subCategory
    .deleteSubCategory(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}


module.exports = {
  addSubCategory,
  getAllSubCategories,
  editSubCategory,
  deleteSubCategory,
};
