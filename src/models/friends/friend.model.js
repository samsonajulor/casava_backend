import { post } from 'axios';

import AccountMongo from './account.mongo';

class Account {
  constructor(...args) {
    this.args = args;
  }

  async find({ accountId, username }) {
    try {
      const account = await AccountMongo.findOne({ $or: [{ _id: accountId }, { username }] });
      return account;
    } catch (err) {
      console.error(err);
    }
  }

  async update(account, payload) {
    try {
      for (const input in payload) {
        console.log(input, account)
        account[input] = payload[input] || account[input];
      }

      await account.save();

      return account;
    } catch (err) {
      console.error(err);
    }
  }

  async create({ username, userId, status }) {
    try {
      const account = await AccountMongo.create({
        username,
        userId,
        status
      });

      return account;
    } catch (err) {
      console.error(err);
    }
  }

  async remove({ userId, username }) {
    try {
      await AccountMongo.deleteOne({ $or: [{ _id: userId }, { username }] });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Account;
