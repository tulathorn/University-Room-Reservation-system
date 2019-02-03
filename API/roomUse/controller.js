const RoomUseModel = require('./model')

module.exports = {
  find: async data => {
    return 'response'
  },
  createOnece: async data => {
    let buildData = {
      BookingID: data.BookingID,
      Pin: '1234'
    }
    return 'response'
  },
  update: async data => {
    return 'response'
  },
  delete: async data => {
    return 'response'
  }
}
