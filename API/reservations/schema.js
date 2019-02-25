const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const ReservationsSchema = sequelize.define(
  'Reservations',
  {
    BookingID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    RID: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    RoomID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    UserID: {
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
)

module.exports = ReservationsSchema
