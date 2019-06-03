const EquipmentService = require('../service/EquipmentService')

module.exports = {
  find: async data => {
    let response = await EquipmentService.getRoombyEquipment(data)
    return response
  }
}
