import { Model, DataTypes } from 'sequelize';
import { DBConnection } from './database_connection';

const Friend = DBConnection.sequelize.define('friend', {
  fullName: {
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
  isFavorite: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isLowerCase: true,
    },
  },
});

export default Friend;
