const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const ReservationsModel = sequelize.define(
  "Reservations",
  {
    BookingID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    RoomID: {
      type: Sequelize.STRING,
      allowNull: false
    },
    UserID: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Day: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    StartTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    EndTime: {
      type: Sequelize.TIME,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

const RoomUse = sequelize.define(
  "RoomUse",
  {
    BookingID: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    Pin: {
      type: Sequelize.STRING,
      allowNull: false
    },
    PinAcceptStart: {
      type: Sequelize.DATE,
      allowNull: false
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
    freezeTableName: true
  }
);
