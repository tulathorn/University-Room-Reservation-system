const { RecurringReservations } = require('../model')
const ReservationsController = require('../controller/ReservationController')

const moment = require('moment')

const checkValidRecurring = async condition => {
  let checkDate = condition.StartDate
  while (moment(checkDate).isSameOrBefore(condition.EndDate)) {
    console.log('condition for check avaiable place', condition)
    let checkRoomAvaiable = await ReservationService.checkroomAvaiable(
      condition.RoomID,
      condition.Date,
      condition.StartTime,
      condition.EndTime
    )
    console.log(checkRoomAvaiable)
    if (checkRoomAvaiable === false) {
      console.log('If the first check')
      return false
    } else {
      console.log('Old', checkDate)
      checkDate = moment(checkDate).add(7, 'day')
      console.log('New', checkDate)
    }
    return true
  }
}

const loopCreateReservation = async condition => {
  let checkDate = condition.StartDate
  while (moment(checkDate).isSameOrBefore(data.EndDate)) {
    console.log('create reservation')
    // let validReservation = await validateReservation(condition)
    let reservations = await ReservationsController.create(condition)
    console.log(reservations)
    if (reservations.code) {
      return (response = {
        Code: 2,
        Error: 'Booking exist with repace some normal reservation'
      })
    } else {
      console.log('Calling ReservationController')
      // let reservations = await ReservationsController.create(condition)
      console.log('return reservation', reservations)
      console.log('Old', checkDate)
      checkDate = moment(checkDate).add(7, 'day')
      console.log('New', checkDate)
    }
  }
}

//   response = await RecurringService.createRecurring(data)

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
        let data = await RecurringReservations.where('BookingID', args.BookingID)
          .destroy()
          .then(data => data.toJSON())
          .catch(err => err)
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}
