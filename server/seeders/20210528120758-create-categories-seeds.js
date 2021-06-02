"use strict";
const categoriesData = require("./Data/categories");
const models = require("../models/index");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.category.bulkCreate(categoriesData, {
      updateOnDuplicate: ["name", "details", "createdAt", "updatedAt"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
