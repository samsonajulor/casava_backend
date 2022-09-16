import Sequelize from 'sequelize';
import env from '../config/env';

const property = env.ENV === 'TEST'
  ? {
    name: env.DB_NAME_TEST,
    username: env.DB_USERNAME_TEST,
    password: env.DB_PASSWORD_TEST,
    host: env.DB_HOST_TEST,
    port: env.DB_PORT_TEST,
  }
  : {
    name: env.DB_NAME,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
  };

const db = {};
const sequelize = new Sequelize(property.name, property.username, property.password, {
  host: property.host,
  port: property.port,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
