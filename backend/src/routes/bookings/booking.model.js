import { Sequelize } from 'sequelize';
import db, { TABLES } from '../../configs/database.js';

const { DataTypes } = Sequelize;

const Booking = db.define(
  TABLES.tbl_bookings.table,
  {
    booking_id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      validate: {
        isInt: true,
      },
    },
    room_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        notNull: {
          args: true,
          msg: 'Room ID is required.',
        },
      },
    },
    total_price: {
      type: Sequelize.DOUBLE,
      validate: {
        isNumeric: true,
      },
    },
    check_in_date: {
      type: Sequelize.DATE,
    },
    check_out_date: {
      type: Sequelize.DATE,
    },
    created_by: {
      type: Sequelize.BIGINT,
    },
    updated_by: {
      type: Sequelize.BIGINT,
    },
    created_at: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updated_at: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Booking;
