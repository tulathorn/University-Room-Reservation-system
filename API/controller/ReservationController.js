require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const moment = require('moment')

const ReservationService = require('../service/ReservationService')
const RoomUseController = require('../controller/RoomUseController')
const RoomService = require('../service/RoomService')
const EquipmentService = require('../service/EquipmentService')

const UserController = require('./UserController')
const RoomController = require('./RoomController')

sgMail.setApiKey(process.env.SGMAIL_SECRET)

const emailSent = async (data, datas) => {
  console.log('Sectet:', process.env.SGMAIL_SECRET)
  const user = await UserController.find({ UserID: datas.UserID })
  const userEmail = user[0].EmailAddress
  const room = await RoomController.find({ RoomID: datas.RoomID })
  const roomname = room[0].RoomName

  console.log('UserInfo', user)

  console.log('userEmail =>', userEmail)

  const msg = {
    to: userEmail,
    from: 'reservationsystem.kmutt@gmail.com',
    dynamic_template_data: {
      bookingID: data.BookingID,
      roomname: roomname,
      date: datas.Date,
      timefrom: datas.StartTime,
      timeto: datas.EndTime,
      pin: data.Pin
    },
    template_id: 'd-0ebeed99890b49fabc85d62182c79a75'
  }

  console.log('Message =>', msg)
  return sgMail
    .send(msg)
    .then(data => data)
    .catch(err => {
      console.log('Error on sendGrid', err)
      console.log(err.response.body)
      return err
    })
}

const validateOperatingTime = (OpenTime, CloseTime, condition) => {
  console.log('Func call')
  OpenTime = moment('08:00:00', 'HH:mm:ss')
  CloseTime = moment('21:00:00', 'HH:mm:ss')
  let StartTime = moment(condition.StartTime, 'HH:mm:ss')
  let EndTime = moment(condition.Endtime, 'HH:mm:ss')
  if (OpenTime.isBefore(StartTime) || CloseTime.isAfter(EndTime)) {
    console.log(false)
    return false
  }
  return true
}

module.exports = {
  find: async data => {
    let result = await ReservationService.getAllReservations(data)
    return result
  },
  findAvaiable: async condition => {
    let roomCondition = condition.room || ''
    let equipmentCondition = condition.equipment || ''
    let reservationContition = condition.reservation || ''

    // if (
    //   validateOperatingTime('', '', {
    //     StartTime: reservationContition.StartTime,
    //     EndTime: reservationContition.EndTime
    //   }) != true
    // ) {
    //   return {
    //     msg: 'Condition is out of time. The operating time is from 8:00 to 21:00 UTC+7'
    //   }
    // }

    let result = []
    let buildRoomCondition = []

    let checkRoom = await RoomService.getRoom(roomCondition)
    let checkEquipment = await EquipmentService.getRoombyEquipment(equipmentCondition)
    let checkReservation = await ReservationService.getAllReservations(reservationContition)

    checkRoom.map(room => {
      checkEquipment.map(equipment => {
        if (room.RoomID === equipment.RoomID) {
          buildRoomCondition.push(room)
        }
      })
    })

    if (checkReservation.length === 0) {
      return buildRoomCondition
    }

    checkReservation.map(reservation => {
      let RoomID = reservation.RoomID
      buildRoomCondition.map(element => {
        // console.log(room)
        if (RoomID !== element.RoomID) {
          result.push(element)
        }
      })
    })

    return result
  },
  create: async data => {
    let response = {}
    let checkRoomAvaiable = await ReservationService.checkroomAvaiable(
      data.RoomID,
      data.Date,
      data.StartTime,
      data.EndTime
    )
    console.log(checkRoomAvaiable)
    if (checkRoomAvaiable === false) {
      response = {
        Code: 1,
        Error: 'Booking exist'
      }
    } else {
      let reservation = await ReservationService.createReservation(data)
      console.log(reservation)
      let code = await RoomUseController.createOnece({
        id: reservation.id,
        RoomID: data.RoomID,
        RID: data.RID
      })

      await emailSent(code, data)

      response = { reservation, code }
    }
    return response
  },
  update: async data => {
    let condition = {
      Date: data.Date,
      StartTime: data.StartTime,
      EndTime: data.EndTime
    }
    let response = {}
    let validReservation = {}
    validReservation = await ReservationService.getAllReservations(condition)
    console.log(validReservation)
    if (!(validReservation = [''])) {
      response = {
        Code: 1,
        Error: 'Booking exist'
      }
    } else {
      response = await ReservationService.updateReservation(data)
    }
    return response
  },
  delete: async data => {
    let roomUseDelete = await RoomUseController.delete(data)
    console.log(roomUseDelete)
    let response = await ReservationService.deleteReservation(data)
    return response
  }
}
