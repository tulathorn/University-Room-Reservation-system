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
      Date: data.Date,
      StartTime: data.StartTime,
      EndTime: data.EndTime
    }
    let response = {}
    let validReservation = await ReservationsModel.getAllReservations(condition)
    if (validReservation) {
      response = {
        Code: 1,
        Error: 'Booking exist'
      }
    } else {
      response = await ReservationsModel.createReservation(data)
      let code = await RoomUseController.createOnece(response.BookingID)
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
    let validReservation = await ReservationsModel.getAllReservations(condition)
    if (validReservation) {
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
    return {
      message: 'delete booking called'
    }
  }
}
