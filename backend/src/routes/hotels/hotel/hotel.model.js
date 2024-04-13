import { Sequelize } from 'sequelize';
import db, { TABLES } from '../../../configs/database.js';

const { DataTypes } = Sequelize;

const Hotel = db.define(
  TABLES.tbl_hotels.table,
  {
    hotel_id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      validate: {
        isInt: true,
      },
    },
    title: {
      type: Sequelize.STRING(255),
    },
    phone: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.TEXT('long'),
    },
    address: {
      type: Sequelize.TEXT('long'),
    },
    image: {
      type: Sequelize.STRING(255),
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

export default Hotel;
