import { Model, DataTypes } from 'sequelize';
import { DBConnection } from '../database_connection';

const User = DBConnection.sequelize.define('user', {
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isLowerCase: true,
    },
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isLowerCase: true,
    },
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isLowerCase: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isLowerCase: true,
    },
  },
  accountId: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  friendList: {
    type: DataTypes.ENUM(),
    allowNull: true,
  },
});

export default User;
