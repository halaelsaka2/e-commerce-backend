"use strict";
const rolesData = require("./Data/roles");
const models = require("../models/index");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.role.bulkCreate(rolesData, {
      updateOnDuplicate: ["name", "createdAt", "updatedAt"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
