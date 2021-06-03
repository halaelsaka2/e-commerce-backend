const jwt = require("jsonwebtoken");
require("dotenv").config();
const { subCategory, user, product } = require("../../server/models");

function ensureAuthenticated(req, res, next) {
  const bearerHeader = req.header("Authorization");
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const decoded = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } else {
    res.sendStatus(403);
  }
}

async function checkIfCategoryHaveSub(req, res, next) {
  const categories = await subCategory.getSubByCategoryId(req.params.id);
  if (categories.length > 0) {
    res.json({ deleted: false, msg: `can't delete Category with id :${req.params.id}` });
  } else {
    next();
  }
}

async function checkIfUserHaveRole(req, res, next) {
  const users = await user.getUserByRoleId(req.params.id);
  if (users.length > 0) {
    res.json({ deleted: false, msg: ` can't delete Role with id :${req.params.id}` });
  } else {
    next();
  }
}

async function checkIfProductInSubCat(req, res, next) {
  const products = await product.getProductsBySubId(req.params.id);
  if (products.length > 0) {
    res.json({ deleted: false, msg: ` can't delete Sub Category with id: ${req.params.id} ` });
  } else {
    next();
  }
}

function paginationCalculations(req) {
  const limit = 10;
  const page = req.params.page;
  const offset = limit * (page - 1);
  return { limit, offset };
}
module.exports = {
  ensureAuthenticated,
  checkIfCategoryHaveSub,
  checkIfUserHaveRole,
  checkIfProductInSubCat,
  paginationCalculations,
};
