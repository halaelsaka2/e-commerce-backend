"use strict";
const productsData = require("./Data/products");
const models = require("../models/index");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.product.bulkCreate(productsData, {
      updateOnDuplicate: ["name", "description", "price","image", "subCategoryId", "createdAt", "updatedAt"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
