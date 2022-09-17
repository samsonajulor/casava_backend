import { post } from 'axios';

import UserMongo from './user.mongo';

class User {
  constructor(...args) {
    this.args = args;
  }

  async find({ userId, email }) {
    try {
      const profile = await UserMongo.findOne({ $or: [{ _id: userId }, { email }] });
      return profile;
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

  async create({
        firstName,
        lastName,
        email,
        emailToken,
        password,
        isVerified,
      }) {
    try {
      const user = await UserMongo.create({
        firstName,
        lastName,
        email,
        emailToken,
        password,
        isVerified,
      });

      return user
    } catch (err) {
      console.error(err);
    }
  }

  async remove({ userId, email}) {
    try {
      await UserMongo.deleteOne({ $or: [{ _id: userId }, { email }] });
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
