const ReservationsModel = require('./model')
const UserController = require('../users/controller')
const RoomController = require('../rooms/controller')

module.exports = {
  find: async data => {
    return await ReservationsModel.getAllReservations(data)
  },
  create: async data => {
    // let queryUser = {
    //   UserID: data.UserID
    // }
    // let queryRoom = {
    //   RoomID: data.RoomID
    // }
    // let UserInfo = await UserController.find(queryUser)
    // let RoomInfo = await RoomController.find(queryRoom)
    // let UserID = UserInfo.UserID
    // let RoomID = RoomInfo.RoomID
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
    }
    return response
  },
  update: async data => {
    return {
      message: 'update booking called'
    }
  },
  delete: async data => {
    return {
      message: 'delete booking called'
    }
  }
}
