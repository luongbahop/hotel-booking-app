import { Sequelize } from 'sequelize';
import models from '../../models.js';
import { TABLES } from '../../../configs/database.js';
import { buildFindAllConditions } from '../../../helpers/common.helper.js';

const Op = Sequelize.Op;
const { Hotel, Room, User, Booking } = models;

// get all rooms
export const getRooms = async (req, res) => {
  const start = new Date().getTime();
  try {
    let keyword = req.query.keyword || '';
    let check_in_date = req.query?.check_in_date;
    let check_out_date = req.query?.check_out_date || '';
    let attributes = req.query.attributes || TABLES.tbl_rooms.default_attributes;

    let data = await Room.findAll(
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

    let bookedSlots = [];

    if (check_in_date && check_out_date) {
      const roomIDs = data.map((room) => room.room_id);

      bookedSlots = await Booking.findAll({
        where: {
          room_id: roomIDs,
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


      data = data?.map((room) => {
        const currentBookedSlots = bookedSlots.filter((slot) => slot.room_id === room.room_id);
        console.log(222, currentBookedSlots.length, room?.number_of_rooms, room.room_id);
        const isRoomAvailable = currentBookedSlots.length < room?.number_of_rooms;
        return {
          ...room.dataValues,
          booked_slots: currentBookedSlots?.length,
          available_rooms: room?.number_of_rooms - currentBookedSlots.length,
          totalRooms: room?.number_of_rooms,
          is_available: isRoomAvailable,
        }
      });

      console.log('avai', data.length);
    }

    return res.status(200).send({
      bookedSlots,
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
