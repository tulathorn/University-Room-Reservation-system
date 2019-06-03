const assert = require('assert')
const ReservationService = require('../service/ReservationService')
describe('Reservation', function() {
  it('จองห้องเวลา 13-14 โดยที่มีการใช้ห้องก่อนหน้าเวลา 10:00-11:00 ได้', async function() {
    let RoomID = 2
    let Date = '2019-05-05'
    let StartTime = '13:00:00'
    let EndTime = '14:00:00'
    let isRoomAvaiable = await ReservationService.checkroomAvaiable(
      RoomID,
      Date,
      StartTime,
      EndTime
    )
    assert.equal(isRoomAvaiable, true)
  })
  it('จองห้องเวลา 09:00-11:00 โดยที่มีการใช้ห้องก่อนหน้าเวลา 10:00-11:00 ไม่ได้', async function() {
    let RoomID = 2
    let Date = '2019-05-05'
    let StartTime = '09:00:00'
    let EndTime = '11:00:00'
    let isRoomAvaiable = await ReservationService.checkroomAvaiable(
      RoomID,
      Date,
      StartTime,
      EndTime
    )
    assert.equal(isRoomAvaiable, false)
  })
  it('จองห้องเวลา 10:30-11:30 โดยที่มีการใช้ห้องก่อนหน้าเวลา 10:00-11:00 ไม่ได้', async function() {
    let RoomID = 2
    let Date = '2019-05-05'
    let StartTime = '10:30:00'
    let EndTime = '11:30:00'
    let isRoomAvaiable = await ReservationService.checkroomAvaiable(
      RoomID,
      Date,
      StartTime,
      EndTime
    )
    assert.equal(isRoomAvaiable, false)
  })
  it('จองห้องเวลา 10:00-11:00 โดยที่มีการใช้ห้องก่อนหน้าเวลา 10:00-11:00 ไม่ได้', async function() {
    let RoomID = 2
    let Date = '2019-05-05'
    let StartTime = '10:00:00'
    let EndTime = '11:00:00'
    let isRoomAvaiable = await ReservationService.checkroomAvaiable(
      RoomID,
      Date,
      StartTime,
      EndTime
    )
    assert.equal(isRoomAvaiable, false)
  })
})
