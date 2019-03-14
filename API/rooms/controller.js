const RoomRepo = require('./repository')
const R = require('ramda')

module.exports = {
  find: async data => {
    console.log(data)
    if (data) {
      let response = await RoomRepo.getRoom(data)
      return response
    }
    let response = await RoomRepo.getAllRooms()
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
    let response = await RoomRepo.createRoom(body)
    return response
  },
  update: async data => {
    const room = R.pickAll(
      [
        'RoomID',
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
    console.log('input', body)
    let response = await RoomRepo.updateRoom(body)
    return response
  },
  delete: async data => {
    let response = await RoomRepo.deleteRoom(data)
    return response
  }
}
