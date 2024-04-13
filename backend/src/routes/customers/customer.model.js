import { Sequelize } from 'sequelize';
import db, { TABLES } from '../../configs/database.js';

const { DataTypes } = Sequelize;

const Customer = db.define(
  TABLES.tbl_customers.table,
  {
    customer_id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      validate: {
        isInt: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'E-mail is required.',
        },
        isEmail: {
          args: true,
          msg: 'E-mail is invalid format.',
        },
      },
    },
    fullname: {
      type: Sequelize.STRING(255),
    },
    birthday: {
      type: Sequelize.DATE,
    },
    gender: {
      type: Sequelize.TINYINT,
      validate: {
        isInt: true,
        isNumeric: true,
      },
    },
    phone: {
      type: Sequelize.STRING(255),
    },
    address: {
      type: Sequelize.STRING(200),
    },
    avatar: {
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

export default Customer;
