const RecurringService = require('../service/RecurringService')
const ReservationsController = require('../controller/ReservationController')
const ReservationService = require('../service/ReservationService')
const RoomUseService = require('../service/RoomUseService')

const moment = require('moment')

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
    let phaseDate = moment(checkDate).format('YYYY-MM-DD')
    while (moment(checkDate).isSameOrBefore(condition.EndDate)) {
      console.log('condition for check avaiable place', condition)
      console.log('phaseDate =>', phaseDate)
      let checkRoomAvaiable = await ReservationService.checkroomAvaiable(
        condition.RoomID,
        phaseDate,
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
        console.log('Old', phaseDate)
        checkDate = moment(checkDate).add(7, 'day')
        phaseDate = moment(checkDate).format('YYYY-MM-DD')
        console.log('New', phaseDate)
      }
    }
    if (!response.code) {
      response = await RecurringService.createRecurring(data)
      console.log('=>Recurring create:', response)
      checkDate = data.StartDate
      while (moment(checkDate).isSameOrBefore(data.EndDate)) {
        console.log('create reservation')
        let createReservationCondition = {
          RoomID: data.RoomID,
          RID: response.id,
          UserID: data.UserID,
          Date: phaseDate,
          StartTime: data.StartTime,
          EndTime: data.EndTime,
          Purpose: data.Purpose
        }
        let reservations = await ReservationsController.create(createReservationCondition)
        console.log(reservations)
        if (reservations.code === 1) {
          return (response = {
            Code: 1,
            Error: 'Booking exist2'
          })
        } else {
          console.log('Calling ReservationController')
          console.log('return reservation', reservations)
          console.log('Old', checkDate)
          checkDate = moment(checkDate).add(7, 'day')
          phaseDate = moment(checkDate).format('YYYY-MM-DD')
          console.log('New', phaseDate)
        }
      }
      // response = await RecurringService.createRecurring(data)
    }
    return response
  },
  delete: async data => {
    let reservationCondition = {
      RID: data.BookingID
    }
    let roomUseCondition = {
      RBookingID: data.BookingID
    }
    let deleteRoomUse = await RoomUseService.deleteRecurring(roomUseCondition)
    let deleteReservation = await ReservationService.deleteRecurring(reservationCondition)
    let response = await RecurringService.deleteRecurring(data)
    return response
  }
}
