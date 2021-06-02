"use strict";
const subCategoriesData = require("./Data/subCategories");
const models = require("../models/index");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.subCategory.bulkCreate(subCategoriesData, {
      updateOnDuplicate: ["name", "categoryId", "createdAt", "updatedAt"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("subCategories", null, {});
  },
};
