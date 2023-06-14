"use strict";
const MoneyFormatter = require("../helpers/moneyFormatter");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "authorId" });
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
      // define association here
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name cannot be null",
          },
          notEmpty: {
            msg: "name cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "description cannot be null",
          },
          notEmpty: {
            msg: "description cannot be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "price cannot be null",
          },
          notEmpty: {
            msg: "price cannot be empty",
          },
          min: {
            msg: "Minimum price at least must be 50",
            args: 50,
          },
        },
        get() {
          return MoneyFormatter.formatToEuro(this.getDataValue("price"));
        },
      },
      stock: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "categoryId cannot be null",
          },
          notEmpty: {
            msg: "categoryId cannot be empty",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "authorId cannot be null",
          },
          notEmpty: {
            msg: "authorId cannot be empty",
          },
        },
      },
      status: {
        type: DataTypes.ENUM({
          values: ["Active", "Inactive", "Archived"],
        }),
        allowNull: false,
        defaultValue: "Active",
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
