const { Equipment } = require('../model')

module.exports = {
  getRoombyEquipment: async args => {
    console.log('Equipment =>', args)
    const data = await Equipment.where({ ...args })
      .fetchAll()
      .then(data => data.toJSON())
      .catch(err => err)

    return data
  }
}
