import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env.APP_ENV || 'development';
const dialect = process.env.DB_DIALECT || 'mysql';
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

if (env === 'development') {
  console.log('ENV configs:', {
    env,
    db: {
      host,
      dialect,
      database,
      username,
      password,
    },
  });
}

const connectionObject = {
  host: host || 'localhost',
  dialect,
  operatorsAliases: false,
  retry: { max: 10 },
  pool: {
    max: process.env.DB_POOL_MAX | 5,
    min: process.env.DB_POOL_MIN | 1,
    acquire: process.env.DB_POOL_ACQUIRE | 30000,
    idle: process.env.DB_POOL_IDLE | 10000,
  },
  logging: env === 'production',
};

const db = new Sequelize(database, username, password, connectionObject);

export default db;
