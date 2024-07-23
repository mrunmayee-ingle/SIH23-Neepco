const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  var Bid = sequelize.define(
    "Bid",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      tenderId: {
        type: DataTypes.UUID,
        references: {
          model: "Tender",
          key: "id",
        },
      },
      rating: {
        type: Sequelize.STRING,
      },
      ocrId: {
        type: DataTypes.UUID,
        references: {
          model: "Ocr",
          key: "id",
        },
      },
      pdfUrl: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      schema: "internal",
      timestamps: false,
      freezeeTableName: true,
      tableName: "Bids",
    }
  );

  Bid.associate = (models) => {
    Bid.belongsTo(models.Ocr, {
      foreignKey: "ocrId",
      as: "ocr",
    });
  };

  return Bid;
};
