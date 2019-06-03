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
  validateCode: async args => {
    const response = await RoomUse.where({ ...args })
      .fetchAll()
      .then(data => data.toJSON())
      .catch(err => err)

    console.log(response)
    return response
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
        console.log('args on service', args)
        let data = await RoomUse.forge({ ...args })
          .save()
          .then(result => result.toJSON())
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  update: args => {
    const result = RoomUse.where('UsageID', args.UsageID)
      .save(args, { method: 'update' })
      .then(data => data.toJSON())
      .catch(err => err)
    return result
  },
  delete: args => {
    const result = RoomUse.where('BookingID', args.BookingID)
      .destroy()
      .then(data => data.toJSON())
      .catch(err => err)

    return result
  },
  deleteRecurring: args => {
    const result = RoomUse.where('RBookingID', args.RBookingID)
      .destroy()
      .then(data => data.toJSON())
      .catch(err => err)

    return result
  }
}
