const ReservationsModel = require('./model')
const UserController = require('../users/controller')
const RoomController = require('../rooms/controller')
const RoomUseController = require('../roomUse/controller')

module.exports = {
  find: async data => {
    return await ReservationsModel.getAllReservations(data)
  },
  create: async data => {
    let condition = {
      RoomID: data.RoomID,
      Date: data.Date,
      StartTime: data.StartTime,
      EndTime: data.EndTime
    }
    let response = {}
    let validReservation = await ReservationsModel.getAllReservations(condition)
    console.log(validReservation)
    if (!(validReservation = [''])) {
      response = {
        Code: 1,
        Error: 'Booking exist'
      }
    } else {
      let reservation = await ReservationsModel.createReservation(data)
      let code = await RoomUseController.createOnece(reservation.BookingID)

      reservation = reservation.dataValues
      code = code.dataValues
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
    validReservation = await ReservationsModel.getAllReservations(condition)
    console.log(validReservation)
    if (!(validReservation = [''])) {
      response = {
        Code: 1,
        Error: 'Booking exist'
      }
    } else {
      response = await ReservationsModel.updateReservation(data)
    }
    return response
  },
  delete: async data => {
    let roomUseDelete = await RoomUseController.delete(data)
    console.log(roomUseDelete)
    let response = await ReservationsModel.deleteReservation(data)
    return response
  }
}
