const { Room, Equipment } = require('../model')

module.exports = {
  getRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Room.where({ ...args }).fetchAll({ withRelated: ['Equipment'] })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  createRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await Room.forge(args.room).save()
        console.log(room.toJSON())
        const equipmentBody = {
          RoomID: room.id,
          ...args.equipment
        }
        const equipment = await Equipment.forge(equipmentBody).save()
        const data = { ...room.toJSON(), equipment }
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  updateRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('RoomID', args.room.RoomID)
        const rooms = await Room.where('RoomID', args.room.RoomID)
          .save(args.room, { method: 'update' })
          .then(data => data.toJSON())
        const equipment = await Equipment.where('RoomID', args.room.RoomID)
          .save(args.equipment, { method: 'update' })
          .then(data => data.toJSON())
        const data = { ...rooms, equipment }
        console.log('data', data)
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  deleteRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        const equipmentDestroy = await Equipment.where('RoomID', args.RoomID)
          .destroy()
          .then(data => data.toJSON())
        const roomDestroy = await Room.where('RoomID', args.RoomID)
          .destroy()
          .then(data => data.toJSON())
        console.log(equipmentDestroy && roomDestroy)
        resolve(roomDestroy)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}
