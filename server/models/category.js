"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      category.hasMany(models.subCategory, {
        foreignKey: "categoryId",
        as: "subCategories",
      });
    }
  }
  category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      details: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
    }
  );

  category.addCategory = (data) => {
    return new Promise((resolve, reject) => {
      category
        .create(data)
        .then((result) => {
          result.msg = "category created Successfully";
          const findProduct = category.getCategoryById(result.id);
          resolve(findProduct);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  category.getAllCategory = async () => {
    return await category.findAll({ include: [{ all: true }] });
  };

  category.getCategoryById = async (id) => {
    return await category.findOne({ where: { id }, include: [{ all: true }] });
  };

  category.deleteCategory = async (id) => {
    return new Promise((resolve, reject) => {
      category
        .findOne({ where: { id } })
        .then((searchResult) => {
          if (!searchResult) resolve({ deleted: false, msg: "this category not found " });
          searchResult
            .destroy()
            .then((result) => {
              resolve({ id: searchResult.dataValues.id, deleted: true, msg: "category destroyed successfully" });
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

  category.editCategory = (newCategory) => {
    return new Promise((resolve, reject) => {
      category
        .findOne({ where: { id: newCategory.id } })
        .then((searchResult) => {
          if (!searchResult) reject("category not found with this id:" + id);
          category
            .update(newCategory, { where: { id: newCategory.id }, returning: true, plain: true })
            .then((result) => {
              resolve({ ...result[1].dataValues, msg: "category Type updated successfully" });
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

  return category;
};
