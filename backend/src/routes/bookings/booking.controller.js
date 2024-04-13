import { Sequelize } from 'sequelize';
import models from '../models.js';
import { TABLES } from '../../configs/database.js';
import { buildFindAllConditions } from '../../helpers/common.helper.js';

const Op = Sequelize.Op;
const { Booking } = models;

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
          where: {
            [Op.or]: [{ total_price: { [Op.like]: `%${keyword}%` } }],
          },
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
    const { room_id } = req.body;
    if (!room_id) {
      return res.status(500).json({
        success: false,
        error: 'Room ID is a required field.',
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
