import { Sequelize } from 'sequelize';
import models from '../../models.js';
import { TABLES } from '../../../configs/database.js';
import { buildFindAllConditions } from '../../../helpers/common.helper.js';

const Op = Sequelize.Op;
const { Hotel, Room } = models;

// get all hotels
export const getHotels = async (req, res) => {
  const start = new Date().getTime();
  try {
    let keyword = req.query.keyword || '';
    let attributes = req.query.attributes || TABLES.tbl_hotels.default_attributes;

    const data = await Hotel.findAll(
      buildFindAllConditions(
        req.query,
        {
          attributes,
          where: {
            [Op.or]: [{ title: { [Op.like]: `%${keyword}%` } }, { description: { [Op.like]: `%${keyword}%` } }, { phone: { [Op.like]: `%${keyword}%` } }],
          },
          include: [
            {
              model: Room,
              as: 'rooms',
              attributes: TABLES.tbl_rooms.default_attributes,
            },
          ],
        },
        { orderBy: 'hotel_id', order: 'DESC' }
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

// get hotel by id
export const getHotelById = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Hotel.findOne({
      where: {
        hotel_id: id,
      },
      include: [
        {
          model: Room,
          as: 'rooms',
          attributes: TABLES.tbl_rooms.default_attributes,
        },
      ],
    });
    if (!data) {
      return res.status(500).send({
        error: `Hotel ID = ${id} is not found.`,
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

// create a new hotel
export const createHotel = async (req, res) => {
  const start = new Date().getTime();
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(500).json({
        success: false,
        error: 'Title is a required field.',
        exe_time: new Date().getTime() - start,
      });
    }
    const data = await Hotel.create({ ...req.body, created_by: req?.userInfo?.user_id });

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

// update hotel by id
export const updateHotel = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Hotel.findOne({
      where: {
        hotel_id: id,
      },
    });

    if (data) {
      await Hotel.update(
        { ...req.body, updated_by: req?.userInfo?.user_id },
        {
          where: {
            hotel_id: id,
          },
          individualHooks: true,
        }
      );
      const updatedData = await Hotel.findOne({
        where: {
          hotel_id: id,
        },
      });
      return res.status(201).send({
        data: updatedData,
        success: true,
        exe_time: new Date().getTime() - start,
      });
    }
    return res.status(500).send({
      error: `Hotel ID = ${id} is not found.`,
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

// delete hotel by id
export const deleteHotel = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Hotel.findOne({
      where: {
        hotel_id: id,
      },
    });
    if (!data) {
      return res.status(500).send({
        error: `Hotel ID = ${id} is not found.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }
    await Hotel.destroy({
      where: {
        hotel_id: id,
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
