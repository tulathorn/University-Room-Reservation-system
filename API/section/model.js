const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const SectuonModel = sequelize.define(
  "Section",
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Section: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Year: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Program: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
