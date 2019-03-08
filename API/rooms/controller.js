const RoomModel = require('./model')
const R = require('ramda')

module.exports = {
  find: async data => {
    console.log(data)
    if (data) {
      let response = await RoomModel.getRoom(data)
      return response
    }
    let response = await RoomModel.getAllRooms()
    return response
  },
  create: async data => {
    const room = R.pickAll(
      [
        'RoomName',
        'Picture',
        'Building',
        'Floor',
        'RoomNumber',
        'PeopleCapacity',
        'ClosingDay',
        'OpenTime',
        'CloseTime'
      ],
      data
    )
    const equipment = R.pick(
      [
        'HasTeacherComputers',
        'HasStudentComputers',
        'HasProjector',
        'HasAirConditioner',
        'HasWhiteboard',
        'HasVisualizer'
      ],
      data.Equipment
    )

    const body = { room, equipment }
    let response = await RoomModel.createRoom(body)
    return response
  },
  update: async data => {
    let response = await RoomModel.updateRoom(data)
    return response
  },
  delete: async data => {
    let response = await RoomModel.deleteRoom(data)
    return response
  }
}
