"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
      role.hasMany(models.user, {
        foreignKey: "id",
        as: "role",
      });
    }
  }
  role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "role",
    }
  );

  role.addRole = (data) => {
    return new Promise((resolve, reject) => {
      role
        .create(data)
        .then((result) => {
          result.msg = "role created Successfully";
          const findRole = role.getRoleById(result.id);
          resolve(findRole);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  role.getRoleById = async (id) => {
    return await role.findOne({ where: { id } });
  };
  role.getAllRoles = async () => {
    return await role.findAll({});
  };
  role.deleteRole = async (id) => {
    return new Promise((resolve, reject) => {
      role
        .findOne({ where: { id } })
        .then((searchResult) => {
          if (!searchResult) resolve({ deleted: false, msg: "this Role not found " });
          searchResult
            .destroy()
            .then((result) => {
              resolve({ id: searchResult.dataValues.id, deleted: true, msg: "Role destroyed successfully" });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  role.editRole = (newRole) => {
    return new Promise((resolve, reject) => {
      role
        .findOne({ where: { id: newRole.id } })
        .then((searchResult) => {
          if (!searchResult) reject("Role not found with this id:" + id);
          role
            .update(newRole, { where: { id: newRole.id }, returning: true, plain: true })
            .then((result) => {
              resolve({ ...result[1].dataValues, msg: "Role Type updated successfully" });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  return role;
};
