const bookshelf = require('bookshelf')
const knex = require('./knex')

const Bookshelf = bookshelf(knex)

Bookshelf.plugin('registry')

module.exports = Bookshelf
