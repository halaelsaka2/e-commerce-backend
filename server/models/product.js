"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.belongsTo(models.subCategory, {
        foreignKey: "subCategoryId",
      });
    }
  }
  product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: true,
        onUpdate: true,
      },
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "product",
    }
  );

  product.addProduct = (data) => {
    return new Promise((resolve, reject) => {
      product
        .create(data)
        .then((result) => {
          result.msg = "product created Successfully";
          const findProduct = product.getProductById(result.id);
          resolve(findProduct);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  product.getProductById = async (id) => {
    return await product.findOne({ where: { id }, include: [{ all: true, nested: false }] });
  };
  product.getProductsBySubId = async (id) => {
    return await product.findAll({ where: { subCategoryId: id }, include: [{ all: true, nested: true }] });
  };
  product.getAllProducts = async (limit, offset) => {
    return await product.findAndCountAll({ include: [{ all: true }], limit, offset });
  };
  product.deleteProduct = async (id) => {
    return new Promise((resolve, reject) => {
      product
        .findOne({ where: { id } })
        .then((searchResult) => {
          if (!searchResult) resolve({ deleted: false, msg: "this product not found " });
          searchResult
            .destroy()
            .then((result) => {
              resolve({ id: searchResult.dataValues.id, deleted: true, msg: "product destroyed successfully" });
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

  product.editProduct = (newProduct) => {
    return new Promise((resolve, reject) => {
      product
        .findOne({ where: { id: newProduct.id } })
        .then((searchResult) => {
          if (!searchResult) reject("product not found with this id:" + id);
          product
            .update(newProduct, { where: { id: newProduct.id }, returning: true, plain: true })
            .then((result) => {
              product.getProductById(result[1].dataValues.id).then((response) => {
                resolve({ ...response.dataValues, msg: "product Type updated successfully" });
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

  return product;
};
