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

module.exports = { Room, Equipment }
