const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

// const ReservationsSchema = require('../reservations/schema')
const { RoomInformationSchema, EquipmentSchema } = require('./schema')
const ReservationsSchema = require('../reservations/schema')

RoomInformationSchema.associate = model => {
  model.RoomInformationSchema.belongsTo(model.EquipmentSchema, {
    onDelete: 'CASCADE',
    foreignKey: {
      allowNull: false
    }
  })
  model.RoomInformationSchema.hasMany(model.ReservationsSchema)
}

// RoomInformationSchema.belongsTo(EquipmentSchema, { foreignKey: 'RoomID' })
// // RoomInformationModel.belongsTo(ReservationMode, { foreignKey: 'RoomID' })
// RoomInformationModel.hasMany(ReservationsSchema, { as: 'Reservations', foreignKey: 'RoomID' })
// // RoomInformationModel.belongsToMany(ReservationsSchema, { through: 'Reservations' })

module.exports = {
  getAllRooms: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RoomInformationSchema.findAll({
          include: [
            { model: EquipmentSchema, foreignKey: 'RoomID' },
            { model: ReservationsSchema, foreignKey: 'RoomID' }
          ]
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  getRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let condition = args
        let data = await RoomInformationSchema.findAll({
          where: {
            ...condition
          },
          include: [
            { model: EquipmentSchema, foreignKey: 'RoomID' },
            { model: ReservationsSchema, foreignKey: 'RoomID' }
          ]
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  createRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let equipment = args.Equipment
        console.log('equipment', equipment)
        let data = await RoomInformationSchema.create(args)
        equipment.RoomID = data.RoomID
        let equipmentCreate = await EquipmentSchema.create(equipment)
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  updateRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('ID', args.RoomID)
        let roomUpdate = await RoomInformationSchema.update(args, {
          where: { RoomID: args.RoomID }
        })
        console.log('Room update response', roomUpdate)
        args.Equipment.RoomID = args.RoomID
        let equipmentUpdate = await EquipmentSchema.update(args.Equipment, {
          where: { RoomID: args.RoomID }
        })
        resolve(roomUpdate)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  deleteRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let equipmentDestroy = await EquipmentSchema.destroy({
          where: { RoomID: args.RoomID }
        })
        let roomDestroy = await RoomInformationSchema.destroy({
          where: { RoomID: args.RoomID }
        })
        resolve(roomDestroy)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}
