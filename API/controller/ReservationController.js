const ReservationService = require('../service/ReservationService')
const RoomUseController = require('../roomUse/controller')

module.exports = {
  find: async data => {
    return await ReservationService.getAllReservations(data)
  },
  create: async data => {
    // let condition = {
    //   RoomID: data.RoomID,
    //   Date: data.Date,
    //   StartTime: data.StartTime,
    //   EndTime: data.EndTime
    // }
    // let response = {}
    // let validReservation = await ReservationService.getAllReservations(condition)
    // console.log('validReservation in reservation controller', validReservation.length)
    let response = {}
    let checkRoomAvaiable = await ReservationService.checkroomAvaiable(
      data.RoomID,
      data.Date,
      data.StartTime,
      data.EndTime
    )
    console.log(checkRoomAvaiable)
    if (checkRoomAvaiable === false) {
      response = {
        Code: 1,
        Error: 'Booking exist'
      }
    } else {
      let reservation = await ReservationService.createReservation(data)
      let code = await RoomUseController.createOnece(reservation.id)

      response = { reservation, code }
    }
    return response
  },
  update: async data => {
    let condition = {
      Date: data.Date,
      StartTime: data.StartTime,
      EndTime: data.EndTime
    }
    let response = {}
    let validReservation = {}
    validReservation = await ReservationService.getAllReservations(condition)
    console.log(validReservation)
    if (!(validReservation = [''])) {
      response = {
        Code: 1,
        Error: 'Booking exist'
      }
    } else {
      response = await ReservationService.updateReservation(data)
    }
    return response
  },
  delete: async data => {
    let roomUseDelete = await RoomUseController.delete(data)
    console.log(roomUseDelete)
    let response = await ReservationService.deleteReservation(data)
    return response
  }
}
