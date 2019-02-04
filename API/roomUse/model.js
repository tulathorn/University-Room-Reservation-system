const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const RoomUseModel = sequelize.define(
  'RoomUse',
  {
    UsageID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    BookingID: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    RBookingID: {
      type: Sequelize.INTEGER,
      allowNull: true
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
      allowNull: true
    },
    KeyPickedUp: {
      type: Sequelize.DATE
    },
    KeyReturn: {
      type: Sequelize.DATE,
      allowNull: true
    },
    ReturnInTime: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = {
  getCode: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = 'test'
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  create: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RoomUseModel.create(args)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  delete: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = 'test'
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}
