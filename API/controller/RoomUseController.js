const RoomUseService = require('../service/RoomUseService')

const pinGenerate = () =>
  (pin =
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString())

module.exports = {
  find: async data => {
    return 'response'
  },
  createOnece: async data => {
    console.log(data)
    let buildData = {
      BookingID: data.BookingID,
      Pin: pinGenerate()
    }
    let response = await RoomUseService.create(buildData)
    return response
  },
  update: async data => {
    return 'response'
  },
  delete: async data => {
    return await RoomUseService.delete(data)
  }
}