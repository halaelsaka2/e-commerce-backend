const { product } = require("../models");
var { paginationCalculations } = require("../middlewares");

async function addProduct(req, res) {
  product
    .addProduct(req.body)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}

async function getAllProducts(req, res) {
  const { limit, offset } = paginationCalculations(req);
  product
    .getAllProducts(limit, offset)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function getProductsBySubId(req, res) {
  const subId = req.params.subId;
  product
    .getProductsBySubId(subId)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}

async function editProduct(req, res) {
  let newProduct = req.body;
  product
    .editProduct(newProduct)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function deleteProduct(req, res) {
  await product
    .deleteProduct(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
module.exports = {
  addProduct,
  getAllProducts,
  getProductsBySubId,
  editProduct,
  deleteProduct,
};
