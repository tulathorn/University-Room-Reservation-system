const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

// const ReservationsSchema = require('../reservations/schema')

const RoomInformationModel = sequelize.define(
  'RoomInformation',
  {
    RoomID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    RoomName: {
      type: Sequelize.CHAR,
      allowNull: false
    },
    Picture: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Building: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Floor: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    RoomNumber: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    PeopleCapacity: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    ClosingDay: {
      type: Sequelize.CHAR,
      allowNull: true
    },
    OpenTime: {
      type: Sequelize.TIME,
      allowNull: true
    },
    CloseTime: {
      type: Sequelize.TIME,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

const EquipmentModel = sequelize.define(
  'Equipment',
  {
    RoomID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    HasTeacherComputers: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    HasStudentComputers: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    HasProjector: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    HasWhiteboard: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    HasVisualizer: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

RoomInformationModel.belongsTo(EquipmentModel, { foreignKey: 'RoomID' })
// RoomInformationModel.belongsTo(ReservationMode, { foreignKey: 'RoomID' })
// RoomInformationModel.hasMany(ReservationMode)
// RoomInformationModel.belongsToMany(ReservationsSchema, { through: 'Reservations' })

module.exports = {
  RoomInformationModel,
  getAllRooms: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RoomInformationModel.findAll({
          include: [
            { model: EquipmentModel, foreignKey: 'RoomID' }
            // { model: ReservationsSchema, foreignKey: 'RoomID' }
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
        let data = await RoomInformationModel.findAll({
          where: {
            ...condition
          },
          include: [
            { model: EquipmentModel, foreignKey: 'RoomID' }
            // { model: ReservationsSchema, foreignKey: 'RoomID' }
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
        let data = await RoomInformationModel.create(args)
        equipment.RoomID = data.RoomID
        let equipmentCreate = await EquipmentModel.create(equipment)
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
        let roomUpdate = await RoomInformationModel.update(args, {
          where: { RoomID: args.RoomID }
        })
        console.log('Room update response', roomUpdate)
        args.Equipment.RoomID = args.RoomID
        let equipmentUpdate = await EquipmentModel.update(args.Equipment, {
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
        let equipmentDestroy = await EquipmentModel.destroy({
          where: { RoomID: args.RoomID }
        })
        let roomDestroy = await RoomInformationModel.destroy({
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
