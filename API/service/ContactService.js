const { Contact } = require('../model')

odule.exports = {
  getContacts: args => {
    const result = Contact.where({ ...args })
      .fetchAll()
      .then(data => data.toJSON())
      .catch(err => err)

    return result
  },
  createContact: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ContactModel.create(args)
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  updateContact: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ContactModel.update(args, {
          where: { ContactID: args.ContactID }
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  deleteContact: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ContactModel.destroy({ where: { ContactID: args.ContactID } })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}
