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
    let response = await RoomUseService.validateCode(data)
    console.log(response.length)

    // Respose
    if (response.length !== 0) {
      console.log('Incondition', response)
      return {
        open: true,
        data: response[0]
      }
    }
    console.log('Not incondition')
    return {
      open: false,
      data: null
    }
  },
  createOnece: async data => {
    console.log(data)
    let buildData = {
      BookingID: data.id,
      RoomID: data.RoomID,
      RBookingID: data.RID,
      Pin: pinGenerate()
    }
    console.log('=>Build data', buildData)
    let response = await RoomUseService.create(buildData)
    return response
  },
  update: async data => {
    return await RoomUseService.update(data)
  },
  delete: async data => {
    return await RoomUseService.delete(data)
  }
}
