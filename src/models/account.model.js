import { Model, DataTypes } from 'sequelize';
import { DBConnection } from './database_connection';

const Account = DBConnection.sequelize.define('account', {
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isLowerCase: true,
    },
  },
  accountNumber: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isLowerCase: true,
      min: 10,
      max: 10,
    },
  },
  accountName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isLowerCase: true,
      isEmail: true,
    },
  },
});

export default Account;
