import { post } from 'axios';

import FriendMongo from './friend.mongo';

class Friend {
  constructor(...args) {
    this.args = args;
  }

  async find({ friendId }) {
    try {
      console.log(friendId)
      const friend = friendId ? await FriendMongo.findOne({ _id: friendId }) : await FriendMongo.find();
      return friend;
    } catch (err) {
      console.error(err);
    }
  }

  async update(friend, payload) {
    try {
      for (const input in payload) {
        friend[input] = payload[input] || friend[input];
      }

      await friend.save();

      return friend;
    } catch (err) {
      console.error(err);
    }
  }

  async create({ accountId, userId, fullName, isFavorite, canViewStatus }) {
    try {
      const friend = await FriendMongo.create({
        accountId,
        userId,
        fullName,
        isFavorite,
        canViewStatus,
      });

      return friend;
    } catch (err) {
      console.error(err);
    }
  }

  async remove({ friendId }) {
    try {
      await FriendMongo.deleteOne({ _id: friendId });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Friend;
