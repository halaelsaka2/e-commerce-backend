"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsTo(models.role, {
        as: "role",
        foreignKey: "roleId",
      });
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: { type: DataTypes.STRING },
      roleId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  user.login = (data) => {
    return new Promise((resolve, reject) => {
      user
        .count({ where: { email: data.email } })
        .then((count) => {
          if (count == 0) {
            resolve({ isAuthenticate: false, msg: "USER NOT FOUND" });
          } else
            user
              .findOne({
                where: { email: data.email },
                include: [{ all: true, nested: false }],
              })
              .then((result) => {
                if (!validatePassword(data.password, result.dataValues.password))
                  resolve({ isAuthenticate: false, msg: "Email OR PASSWORD NOT CORRECT" });
                const payload = {
                  data: {
                    id: result.dataValues.id,
                    email: result.dataValues.email,
                    roleId: result.dataValues.roleId,
                  },
                };
                let expireDate = process.env.TOKEN_EXPIRE_DATE;

                let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expireDate });

                resolve({
                  id: result.dataValues.id,
                  userName: result.dataValues.userName,
                  roleId: result.dataValues.roleId,
                  token: token,
                  isAuthenticate: true,
                });
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

  user.createUser = (data) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({ where: { email: data.email } })
        .then((findResult) => {
          if (findResult) {
            resolve({ isSignUp: false, msg: "EMAIL ALREADY EXISTS" });
          } else {
            user
              .create(data)
              .then(async (result) => {
                result.msg = "User created Successfully";
                await user.getUserById(result.id).then((result) => {
                  resolve({ ...result.dataValues, isSignUp: true, msg: "User created Successfully" });
                });
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  user.getUserById = async (id) => {
    return await user.findOne({ where: { id }, include: [{ all: true }] });
  };

  user.getUserByRoleId = async (id) => {
    return await user.findAll({ where: { roleId: id }, include: [{ all: true }] });
  };

  user.getUserByEmail = async (email) => {
    return await user.findOne({ where: { email }, include: [{ all: true }] });
  };

  user.getAllUsers = async () => {
    return await user.findAll({ include: [{ all: true }] });
  };
  function validatePassword(password, storedPassword) {
    return bcrypt.compareSync(password, storedPassword);
  }
  user.editUser = async (newUser) => {
    return new Promise((resolve, reject) => {
      user
        .findOne({ where: { id: newUser.id } })
        .then((searchResult) => {
          if (!searchResult) reject("user not found with this id:" + id);
          user
            .update(newUser, {
              where: { id: newUser.id },
              returning: true,
              plain: true,
            })
            .then((result) => {
              user.getUserById(result[1].dataValues.id).then((response) => {
                resolve({ ...response.dataValues, msg: "user Type updated successfully" });
              });
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

  return user;
};
