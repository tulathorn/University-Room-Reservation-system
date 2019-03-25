const { RecurringReservations } = require('../model')

module.exports = {
  getRecurring: args => {
    const result = RecurringReservations.where({ ...args })
      .fetchAll({ withRelated: ['Reservation', 'Section'] })
      .then(data => data.toJSON())
      .catch(err => err)

    return result
  },
  createRecurring: args => {
    const result = RecurringReservations.forge({ ...args })
      .save()
      .then(data => data.toJSON())
      .catch(err => err)

    return result
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
