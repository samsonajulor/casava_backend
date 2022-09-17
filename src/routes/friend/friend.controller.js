import AccountModel from '../../models/account/account.model';
import FriendModel from '../../models/friend/friend.model';
import UserModel from '../../models/user/user.model';
import Tools from '../../utils';

const { find: findAccount } = new AccountModel();
const { find: findUser } = new UserModel();
const { update, find, create, remove } = new FriendModel();
const { errorResponse, successResponse } = Tools;

class Test {
  constructor(...args) {
    this.args = args;
  }

  async get(req, res) {
    try {
      const friend = await find({ friendId: req.query.friendId });
      if (!friend || friend.length == 0)
        return res.status(404).send({ Message: 'Friend does not exist. You might need to add one' });

      return successResponse(res, 'friend(s) retrieved successfully', friend, 200);
    } catch (error) {
      console.log(error);
    }
  }

  async create(req, res) {
    try {
      const { userId, accountId } = req.body;

      // Check if the user already exist in the database
      let account = await findAccount({ accountId });
      let user = await findUser({ userId });

      if (!account) return errorResponse(res, 'Account does not exist', 400, ':-(');
      if (!user) return errorResponse(res, 'User does not exist', 400, ':-(');
      if (user._id.toString() === account.userId.toString())
        return errorResponse(res, 'You own this account', 500, ':-(');

      const newFriend = await create({
        accountId,
        userId,
        fullName: `${user.firstName} ${user.lastName}`,
        isFavorite: false,
        canViewStatus: false,
      });

      return successResponse(res, 'account created successfully', newFriend, 201);
    } catch (error) {
      return errorResponse(res, 'Some error occurred', 500, error.message);
    }
  }

  async remove(req, res) {
    try {
      const friend = await find({ friendId: req.query.friendId });

      (!friend || friend.length === 0) && errorResponse(res, 'no such friend', 400, ':-(');

      await remove({ friendId: req.query.friendId });

      return successResponse(res, 'friend removed successfully', ':-)', 200);
    } catch (error) {}
  }

  async update(req, res) {
    try {
      const friend = await find({friendId: req.query.friendId});
      if (!friend) return res.status(404).send({ Message: 'friend does not exist' });

      await update(friend, req.body);

      return successResponse(res, 'updated successfully', friend, 200);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Test;
