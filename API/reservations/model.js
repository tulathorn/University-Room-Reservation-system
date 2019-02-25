const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const ReservationsSchema = require('./schema')
const { UserModel } = require('../users/model')
const { RoomInformationModel } = require('../rooms/model')

ReservationsSchema.associate = model => {
  model.ReservationsSchema.belongsTo(model.UserModel, { foreignKey: 'UserID' }),
    model.ReservationsSchema.belongsTo(model.RoomInformationModel, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    })
}

// ReservationsModel.associate = model => {
//   model.ReservationsModel.belongsTo(UserModel, { foreignKey: 'UserID' })
// }

// ReservationsModel.belongsTo(UserModel, { foreignKey: 'UserID' })
// ReservationsModel.hasOne(RoomInformationModel, { foreignKey: 'RoomID' })
// ReservationsModel.belongsTo(RoomInformationModel, { foreignKey: 'RoomID' })

module.exports = {
  getAllReservations: args => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log(args)
        let data = await ReservationsSchema.findAll({
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
        let data = await ReservationsSchema.create(args)
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
        let data = await ReservationsSchema.update(args, {
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
        let data = await ReservationsSchema.destroy({
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}
