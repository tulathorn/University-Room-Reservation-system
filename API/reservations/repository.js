const { Reservation } = require('../model')

module.exports = {
  getAllReservations: args => {
    return new Promise(async (resolve, reject) => {
      try {
        const Reservations = await Reservation.where({ ...args })
          .fetchAll({
            withRelated: ['UserInfo', 'RoomInformation', 'RoomUse']
          })
          .then(data => data.toJSON())
        resolve(Reservations)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  createReservation: async args => {
    const result = await Reservation.forge({ ...args })
      .save()
      .then(data => data.toJSON())
      .catch(err => err)
    return result
  },
  updateReservation: args => {
    const result = Reservation.where('BookingID', args.BookingID)
      .save(args, { method: 'update' })
      .then(data => data.toJSON())
      .catch(err => err)
    return result
  },
  deleteReservation: args => {
    const result = Reservation.where('BookingID', args.BookingID)
      .destroy()
      .then(data => data.toJSON())
      .catch(err => err)
    return result
  }
}
