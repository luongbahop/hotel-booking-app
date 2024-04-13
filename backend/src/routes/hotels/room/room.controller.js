import { Sequelize } from 'sequelize';
import models from '../../models.js';
import { TABLES } from '../../../configs/database.js';
import { buildFindAllConditions } from '../../../helpers/common.helper.js';

const Op = Sequelize.Op;
const { Hotel, Room, User } = models;

// get all rooms
export const getRooms = async (req, res) => {
  const start = new Date().getTime();
  try {
    let keyword = req.query.keyword || '';
    let attributes = req.query.attributes || TABLES.tbl_rooms.default_attributes;

    const data = await Room.findAll(
      buildFindAllConditions(
        req.query,
        {
          attributes,
          where: {
            [Op.or]: [{ title: { [Op.like]: `%${keyword}%` } }, { description: { [Op.like]: `%${keyword}%` } }],
          },
          include: [
            { model: Hotel, as: 'hotel' },
            { model: User, as: 'author', attributes: TABLES.tbl_users.default_attributes },
            { model: User, as: 'editor', attributes: TABLES.tbl_users.default_attributes },
          ],
        },
        { orderBy: 'room_id', order: 'DESC' }
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

// get room by id
export const getRoomById = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Room.findOne({
      where: {
        room_id: id,
      },
      include: [
        { model: Hotel, as: 'hotel' },
        { model: User, as: 'author', attributes: TABLES.tbl_users.default_attributes },
        { model: User, as: 'editor', attributes: TABLES.tbl_users.default_attributes },
      ],
    });
    if (!data) {
      return res.status(500).send({
        error: `Room ID = ${id} is not found.`,
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

// create a new room
export const createRoom = async (req, res) => {
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
    const data = await Room.create({ ...req.body, created_by: req?.userInfo?.user_id });

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

// update room by id
export const updateRoom = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Room.findOne({
      where: {
        room_id: id,
      },
    });

    if (data) {
      await Room.update(
        { ...req.body, updated_by: req?.userInfo?.user_id },
        {
          where: {
            room_id: id,
          },
          individualHooks: true,
        }
      );
      const updatedData = await Room.findOne({
        where: {
          room_id: id,
        },
      });
      return res.status(201).send({
        data: updatedData,
        success: true,
        exe_time: new Date().getTime() - start,
      });
    }
    return res.status(500).send({
      error: `Room ID = ${id} is not found.`,
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

// delete room by id
export const deleteRoom = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Room.findOne({
      where: {
        room_id: id,
      },
    });
    if (!data) {
      return res.status(500).send({
        error: `Room ID = ${id} is not found.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }
    await Room.destroy({
      where: {
        room_id: id,
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
