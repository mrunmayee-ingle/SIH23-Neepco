// models/ocrs.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  var Ocrs = sequelize.define(
    "Ocr", // Make sure this matches your actual table name
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      bidNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bidEndDate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      totalQuantity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemCategory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isMSE: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ministryName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      orgName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      departmentName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      schema: "internal",
      timestamps: false,
      freezeeTableName: true,
      tableName: "Ocrs",
    }
  );

  return Ocrs;
};
