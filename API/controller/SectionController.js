const SectionService = require('../service/SectionService')

module.exports = {
  find: async data => {
    let response = await SectionService.get(data)
    return response
  }
}
