// const Sequelize = require('sequelize')
// const sequelize = require('../sequelize')

const RecurringReservationsSchema = require('./schema')

module.exports = {
  getRecurring: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RecurringReservationsSchema.findAll({
          where: { ...args }
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  createRecurring: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RecurringReservationsSchema.create(args)
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  updateRecurring: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RecurringReservationsSchema.update(args, {
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  deleteRecurring: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RecurringReservationsSchema.destroy(args, {
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}
