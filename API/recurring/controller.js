const RecurringReservationsModel = require('./model')
const ReservationsController = require('../reservations/controller')

const validateReservation = async () => {
  let result = true
  let data = await ReservationsController.getAllReservations(condition)
  console.log(data)
  if (!(data = [''])) {
    result = false
  }
  return result
}

module.exports = {
  find: async data => {
    let response = await RecurringReservationsModel.getUser(data)
    return response
  },
  create: async data => {
    let condition = {
      RoomID: data.RoomID,
      Date: data.Date,
      StartTime: data.StartTime,
      EndTime: data.EndTime
    }
    let response = {}
    let validReservation = validateReservation(condition)
    console.log(validReservation)
    if (!(validReservation = [''])) {
      response = {
        Code: 1,
        Error: 'Booking exist'
      }
    } else {
      console.log('Not found')
    }
    let response = await RecurringReservationsModel.createUser(data)
    return response
  },
  update: async data => {
    let response = await RecurringReservationsModel.updateUser(data)
    return response
  },
  delete: async data => {
    let response = await RecurringReservationsModel.deleteUser(data)
    return response
  }
}
