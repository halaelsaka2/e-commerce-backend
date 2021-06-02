"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class subCategory extends Model {
    static associate(models) {
      subCategory.hasMany(models.product, {
        foreignKey: "subCategoryId",
        as: "products",
      });
      subCategory.belongsTo(models.category, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }
  subCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "subCategory",
    }
  );

  subCategory.addSubCategory = (data) => {
    return new Promise((resolve, reject) => {
      subCategory
        .create(data)
        .then((result) => {
          result.msg = "subCategory created Successfully";
          const findProduct = subCategory.getSubById(result.id);
          resolve(findProduct);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  subCategory.getSubById = async (id) => {
    return await subCategory.findOne({ where: { id }, include: [{ all: true, nested: true }] });
  };
  subCategory.getSubByCategoryId = async (id) => {
    return await subCategory.findAll({ where: { categoryId: id }, include: [{ all: true }] });
  };
  subCategory.getAllSubCategories = async () => {
    return await subCategory.findAll({ include: [{ all: true }] });
  };

  subCategory.deleteSubCategory = async (id) => {
    return new Promise((resolve, reject) => {
      subCategory
        .findOne({ where: { id } })
        .then((searchResult) => {
          if (!searchResult) resolve({ deleted: false, msg: "this subCategory not found " });
          searchResult
            .destroy()
            .then((result) => {
              resolve({
                id: searchResult.dataValues.id,
                deleted: true,
                msg: "subCategory destroyed successfully",
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

  subCategory.editSubCategory = (newProduct) => {
    return new Promise((resolve, reject) => {
      subCategory
        .findOne({ where: { id: newProduct.id } })
        .then((searchResult) => {
          if (!searchResult) reject("subCategory not found with this id:" + id);
          subCategory
            .update(newProduct, { where: { id: newProduct.id }, returning: true, plain: true })
            .then((result) => {
              subCategory.getSubById(result[1].dataValues.id).then((response) => {
                resolve({ ...response.dataValues, msg: "sub Category Type updated successfully" });
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

  return subCategory;
};
