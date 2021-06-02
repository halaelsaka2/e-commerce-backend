"use strict";
const UsersData = require("./Data/users");
const models = require("../models/index");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.user.bulkCreate(UsersData, {
      updateOnDuplicate: ["userName", "password", "email", "isActive", "roleId", "createdAt", "updatedAt"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
