import { Sequelize } from 'sequelize';
import moment from 'moment';
import models from '../models.js';
import { TABLES } from '../../configs/database.js';
import { buildFindAllConditions } from '../../helpers/common.helper.js';

const Op = Sequelize.Op;
const { Booking, Room, Hotel } = models;

// get all bookings
export const getBookings = async (req, res) => {
  const start = new Date().getTime();
  try {
    let keyword = req.query.keyword || '';
    let attributes = req.query.attributes || TABLES.tbl_bookings.default_attributes;

    const data = await Booking.findAll(
      buildFindAllConditions(
        req.query,
        {
          attributes,
          where: {},
          include: [
            {
              model: Room,
              as: 'room',
              attributes: TABLES.tbl_rooms.default_attributes,
              include: [
                {
                  model: Hotel,
                  as: 'hotel',
                  attributes: TABLES.tbl_hotels.default_attributes,
                },
              ],
            },
          ],
        },
        { orderBy: 'booking_id', order: 'DESC' }
      )
    );

    return res.status(200).send({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// get booking by id
export const getBookingById = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Booking.findOne({
      where: {
        booking_id: id,
      },
    });
    if (!data) {
      return res.status(500).send({
        error: `Booking ID = ${id} is not found.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }
    return res.status(200).send({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// create a new booking
export const createBooking = async (req, res) => {
  const start = new Date().getTime();
  try {
    const { room_id, total_price, check_in_date, check_out_date } = req.body;
    if (!room_id) {
      return res.status(500).json({
        success: false,
        error: 'Room ID is a required field.',
        exe_time: new Date().getTime() - start,
      });
    }

    if (!total_price) {
      return res.status(500).json({
        success: false,
        error: 'Total Price is a required field.',
        exe_time: new Date().getTime() - start,
      });
    }

    if (!check_in_date) {
      return res.status(500).json({
        success: false,
        error: 'Check In Date is a required field.',
        exe_time: new Date().getTime() - start,
      });
    }

    if (moment(check_in_date).isBefore(moment().subtract(1, 'day').endOf('day'))) {
      return res.status(500).json({
        success: false,
        error: 'Check In Date is not available.',
        exe_time: new Date().getTime() - start,
      });
    }

    if (!check_out_date) {
      return res.status(500).json({
        success: false,
        error: 'Check Out Date is a required field.',
        exe_time: new Date().getTime() - start,
      });
    }

    if (moment(check_out_date).isBefore(moment())) {
      return res.status(500).json({
        success: false,
        error: 'Check Out Date is not available.',
        exe_time: new Date().getTime() - start,
      });
    }

    if (moment(check_out_date).isBefore(check_in_date)) {
      return res.status(500).json({
        success: false,
        error: 'Check Out Date is not available.',
        exe_time: new Date().getTime() - start,
      });
    }

    const room = await Room.findOne({
      where: {
        room_id: room_id,
      },
    });

    if (!room) {
      return res.status(500).json({
        success: false,
        error: `Room ID = ${room_id} is not found.`,
        exe_time: new Date().getTime() - start,
      });
    }

    const bookedSlots = await Booking.findAll({
      where: {
        room_id: room_id,
        [Op.or]: [
          {
            check_in_date: {
              [Op.gte]: check_in_date,
              [Op.lte]: check_out_date,
            },
          },
          {
            check_out_date: {
              [Op.gte]: check_in_date,
              [Op.lte]: check_out_date,
            },
          }
        ]
      },
    });

    const isRoomAvailable = bookedSlots.length < room?.number_of_rooms;
    if (!isRoomAvailable) {
      return res.status(500).json({
        success: false,
        error: 'Room is not available.',
        exe_time: new Date().getTime() - start,
      });
    }

    const data = await Booking.create(req.body);

    return res.status(201).json({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('Internal server error:', error.message);
    return res.status(500).json({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// update booking by id
export const updateBooking = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Booking.findOne({
      where: {
        booking_id: id,
      },
    });

    if (data) {
      await Booking.update(
        req.body,
        {
          where: {
            booking_id: id,
          },
          individualHooks: true,
        }
      );
      const updatedData = await Booking.findOne({
        where: {
          booking_id: id,
        },
      });
      return res.status(201).send({
        data: updatedData,
        success: true,
        exe_time: new Date().getTime() - start,
      });
    }
    return res.status(500).send({
      error: `Booking ID = ${id} is not found.`,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// delete booking by id
export const deleteBooking = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Booking.findOne({
      where: {
        booking_id: id,
      },
    });
    if (!data) {
      return res.status(500).send({
        error: `Booking ID = ${id} is not found.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }
    await Booking.destroy({
      where: {
        booking_id: id,
      },
    });
    return res.status(200).send({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};
