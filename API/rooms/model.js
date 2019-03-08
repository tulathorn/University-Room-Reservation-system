const Bookshelf = require('../bookshelf')

const Equipment = Bookshelf.model('Equipment', {
  tableName: 'Equipment'
})

const Room = Bookshelf.model('Room', {
  tableName: 'RoomInformation',
  Equipment: function() {
    return this.belongsTo(Equipment, 'RoomID', 'RoomID')
  }
})

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
        console.log('ID', args.RoomID)
        let roomUpdate = await RoomInformationSchema.update(args, {
          where: { RoomID: args.RoomID }
        })
        console.log('Room update response', roomUpdate)
        args.Equipment.RoomID = args.RoomID
        let equipmentUpdate = await EquipmentSchema.update(args.Equipment, {
          where: { RoomID: args.RoomID }
        })
        resolve(roomUpdate)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  deleteRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let equipmentDestroy = await EquipmentSchema.destroy({
          where: { RoomID: args.RoomID }
        })
        let roomDestroy = await RoomInformationSchema.destroy({
          where: { RoomID: args.RoomID }
        })
        resolve(roomDestroy)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}
