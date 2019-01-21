const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const ContactModel = sequelize.define(
  "Contact",
  {
    ContactID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    EmailAddress: {
      type: Sequelize.STRING
    },
    Title: {
      type: Sequelize.STRING
    },
    Detail: {
      type: Sequelize.STRING
    },
    DateTime: {
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
