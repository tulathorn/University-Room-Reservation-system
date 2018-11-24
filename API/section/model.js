const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const SectuonModel = sequelize.define("Section", {
  Sequence: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
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
});
