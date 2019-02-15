const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const { UserModel } = require('../users/model')
const { RoomInformationModel } = require('../rooms/model')
const { RecurringReservationsModel } = require('../recurring/model')

const ReservationsModel = sequelize.define(
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
)

ReservationsModel.belongsTo(UserModel, { foreignKey: 'UserID' })
ReservationsModel.belongsTo(RoomInformationModel, { foreignKey: 'RoomID' })

module.exports = {
  ReservationsModel,
  getAllReservations: args => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log(args)
        let data = await ReservationsModel.findAll({
          where: { ...args },
          include: [
            { model: UserModel, foreignKey: 'UserID' },
            { model: RoomInformationModel, foreignKey: 'RoomID' }
          ]
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  createReservation: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ReservationsModel.create(args)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  updateReservation: args => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(args)
        let data = await ReservationsModel.update(args, {
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  deleteReservation: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ReservationsModel.destroy({
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}
