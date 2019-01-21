const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const RoomUse = sequelize.define(
  "RoomUse",
  {
    UsageID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    BookingID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Pin: {
      type: Sequelize.CHAR,
      allowNull: false
    },
    PinAcceptStart: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    PinAcceptEnd: {
      type: Sequelize.DATE,
      allowNull: false
    },
    KeyPickedUp: {
      type: Sequelize.DATE
    },
    KeyReturn: {
      type: Sequelize.DATE,
      allowNull: false
    },
    ReturnInTime: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
