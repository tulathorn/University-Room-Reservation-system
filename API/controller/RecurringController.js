const RecurringService = require('../service/RecurringService')
const ReservationsController = require('../controller/ReservationController')

const moment = require('moment')

const validateReservation = async condition => {
  let result = 0
  let data = await ReservationsController.find(condition)
  console.log('Reservation find =', data.length)
  if (data.length === 0) {
    result = 1
  }
  return result
}

module.exports = {
  find: async data => {
    console.log(moment('2010-10-20').isBefore('2010-10-21'))
    let response = await RecurringService.getRecurring(data)
    return response
  },
  create: async data => {
    let condition = {
      RoomID: data.RoomID,
      Date: data.StartDate,
      StartTime: data.StartTime,
      EndTime: data.EndTime
    }
    let response = {}
    // Loop check date
    let checkDate = data.StartDate
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
        return (response = {
          Code: 1,
          Error: 'Booking exist1'
        })
      } else {
        console.log('Old', checkDate)
        checkDate = moment(checkDate).add(7, 'day')
        console.log('New', checkDate)
      }
    }
    if (!response.code) {
      checkDate = data.StartDate
      while (moment(checkDate).isSameOrBefore(data.EndDate)) {
        console.log('create reservation')
        // let validReservation = await validateReservation(condition)
        let reservations = await ReservationsController.create(condition)
        console.log(reservations)
        if (reservations.code) {
          return (response = {
            Code: 1,
            Error: 'Booking exist2'
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
      response = await RecurringService.createRecurring(data)
    }
    return response
  },
  update: async data => {
    let response = await RecurringService.updateUser(data)
    return response
  },
  delete: async data => {
    let response = await RecurringService.deleteUser(data)
    return response
  }
}
