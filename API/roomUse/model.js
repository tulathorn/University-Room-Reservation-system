const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const RoomUseSchema = require('./schema')

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
        let data = await RoomUseSchemas.create(args)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  delete: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RoomUseSchemas.destroy({ where: { BookingID: args.BookingID } })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}
