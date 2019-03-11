const Bookshelf = require('../bookshelf')

const RoomUse = Bookshelf.model('RoomUse', {
  tableName: 'RoomUse'
})

module.exports = {
  getCode: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = 'test'
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  create: args => {
    return new Promise(async (resolve, reject) => {
      try {
        const code = await RoomUse.forge({ ...args })
          .save()
          .then(data => data.toJSON())
        resolve(code)
      } catch (err) {
        reject(err)
      }
    })
  },
  delete: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RoomUse.where('UsageID', args.UsageID)
          .destroy()
          .then(data => data.toJSON())
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}
