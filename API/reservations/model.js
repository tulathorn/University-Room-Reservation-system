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
      type: Sequelize.INTEGER,
      allowNull: false
    },
    UserID: {
      type: Sequelize.INTEGER,
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
    },
    DateBooked: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    Purpose: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

const RecurringReservationsModel = sequelize.define(
  "RecurringReservations",
  {
    BookingID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    RoomID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    UserID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Term: {
      type: Sequelize.CHAR,
      allowNull: false
    },
    Day: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    StartDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    EndDate: {
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
    },
    DateBooked: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    Purpose: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
