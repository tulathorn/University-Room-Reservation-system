const Reservation = require('./model')

module.exports = {
  getAllReservations: args => {
    return new Promise(async (resolve, reject) => {
      try {
        const Reservations = Reservation.where({ ...args })
          .fetchAll({
            withRelated: ['UserInfo']
          })
          .then(data => data.toJSON())
        resolve(Reservations)
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
