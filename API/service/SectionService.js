const { Section } = require('../model')

module.exports = {
  get: async args => {
    const result = Section.where({ ...args })
      .fetchAll()
      .then(data => data.toJSON())
      .catch(err => err)
    return result
  }
}
