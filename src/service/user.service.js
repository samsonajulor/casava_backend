import { post } from 'axios';

import { DBConnection } from './database_connection';
import UserModel from './user.model';

class User {
  constructor(...args) {
    this.args = args;
  }

  async findOne({ userId, email }) {
    try {
      (async () => {
        await DBConnection.sequelize.sync({ alter: true });
        const profile = await UserModel.findOne({ where: { [Op.or]: [{ id: userId }, { email }] } });
        return profile;
      })();
    } catch (err) {
      console.error(err);
    }
  }

  async findAll() {
    try {
      (async () => {
        await DBConnection.sequelize.sync({ alter: true });
        const profile = await UserModel.findAll();
        return profile;
      })();
    } catch (err) {
      console.error(err);
    }
  }

  async update(user, payload) {
    try {
      for (input in payload) {
        user[input] = input || user[input];
      }

      await user.save();

      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async create({ firstName, lastName, email, emailToken, password, isVerified }) {
    try {
      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        emailToken,
        password,
        isVerified,
      });

      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async remove({ userId, email }) {
    try {
      await UserMongo.destroy({ where: { [Op.or]: [{ id: userId }, { email }] } });
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
