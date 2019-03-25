const { RoomUse } = require('../model')

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
  _create: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RoomUseSchemas.create(args)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  create: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RoomUse.forge({ ...args })
          .save()
          .then(result => result.toJSON())
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  delete: args => {
    const result = RoomUse.where('BookingID', args.BookingID)
      .destroy()
      .then(data => data.toJSON())
      .catch(err => err)

    return result
  }
}
