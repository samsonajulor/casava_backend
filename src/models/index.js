import { Model, DataTypes } from 'sequelize';
import User from './user.model';
import Friend from './friend.model';
import Account from './account.model';

User.hasOne(Account, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});

Account.belongsTo(User);

User.hasMany(Friend, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});

Friend.belongsTo(User);

export { User, Friend, Account };
