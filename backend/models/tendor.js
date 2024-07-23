// models/tendor.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  var Tendor = sequelize.define(
    "Tender",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      pdfUrl: {
        type: DataTypes.STRING,
      },
      bestBidId: {
        type: DataTypes.UUID,
      },
      ocrId: {
        type: DataTypes.UUID,
        references: {
          model: "Ocr", // Make sure "Ocr" matches the actual model name
          key: "id",
        },
      },
    },
    {
      schema: "internal",
      timestamps: false,
      freezeeTableName: true,
      tableName: "Tenders",
    }
  );

  Tendor.associate = (models) => {
    Tendor.belongsTo(models.Ocr, {
      foreignKey: "ocrId",
      as: "ocr", // You can specify an alias for the association if needed
    });
    //bid ID
  };

  return Tendor;
};
