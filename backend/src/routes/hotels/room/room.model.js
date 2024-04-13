import { Sequelize } from 'sequelize';
import db, { TABLES } from '../../../configs/database.js';

const { DataTypes } = Sequelize;

const Room = db.define(
  TABLES.tbl_rooms.table,
  {
    room_id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      validate: {
        isInt: true,
      },
    },
    hotel_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        notNull: {
          args: true,
          msg: 'Hotel ID is required.',
        },
      },
    },
    title: {
      type: Sequelize.STRING(300),
    },
    description: {
      type: Sequelize.TEXT('long'),
    },
    price: {
      type: Sequelize.DOUBLE,
      validate: {
        isNumeric: true,
      },
    },
    type: {
      type: Sequelize.STRING(300),
    },
    sale_price: {
      type: Sequelize.DOUBLE,
    },
    image: {
      type: Sequelize.STRING(300),
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active',
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

export default Room;
