const { Reservation } = require('../model')

module.exports = {
  checkroomAvaiable: async (RoomID, date, StartTime, EndTime) => {
    let check = false
    const condition = {
      RoomID,
      date,
      StartTime,
      EndTime
    }
    const result = await Reservation.where({
      RoomID: condition.RoomID,
      Date: condition.date
    })
      .fetchAll()
      .then(data => {
        console.log(data.toJSON())
        return data.toJSON()
      })
    if (result.length === 0) {
      return (check = true)
    } else {
      result.map(booking => {
        let StartTimeMoment = moment(booking.StartTime, 'HH:mm:ss')
        let EndTimeMoment = moment(booking.EndTime, 'HH:mm:ss')
        let ConditionStart = moment(condition.StartTime, 'HH:mm:ss')
        let ConditionEnd = moment(condition.EndTime, 'HH:mm:ss')
        console.log(
          (moment(ConditionStart).isBefore(StartTimeMoment) ||
            moment(ConditionStart).isAfter(EndTimeMoment)) &&
            (moment(ConditionEnd).isBefore(StartTimeMoment) ||
              moment(ConditionEnd).isAfter(EndTimeMoment))
        )
        if (
          (moment(ConditionStart).isBefore(StartTimeMoment) ||
            moment(ConditionStart).isAfter(EndTimeMoment)) &&
          (moment(ConditionEnd).isBefore(StartTimeMoment) ||
            moment(ConditionEnd).isAfter(EndTimeMoment))
        ) {
          return (check = true)
        }
      })
    }
    return check
  },
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
