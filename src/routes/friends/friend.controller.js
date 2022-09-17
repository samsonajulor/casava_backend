import UserModel from '../../models/user/user.model';
import AccountModel from '../../models/account/account.model';
import Tools from '../../utils';

const { find: findUser } = new UserModel();
const { update, find, create, remove } = new AccountModel();
const { errorResponse, successResponse } = Tools;

class Test {
  constructor(...args) {
    this.args = args;
  }

  async create(req, res) {
    try {
      const { fullName, isFavorite, canViewStatus, accountId } = req.body;

      // Check if the user already exist in the database
      let account = await findAccount({ accountId });

      if (!account) return res.status(400).send({ Message: 'Account does not exist' });

      const newFriend = await create({
        fullName,
        isFavorite,
        canViewStatus,
      });

      return successResponse(res, 'account created successfully', newFriend, 201);
    } catch (error) {
      return errorResponse(res, 'Some error occurred', 500, error.message);
    }
  }

  async remove(req, res) {
    try {
      const friend = await find({ id: req.query.id });

      !friend && errorResponse(res, 'no such friend', 400, ':-(');

      await remove({ id: req.query.id });

      return successResponse(res, 'friend removed successfully', ':-)', 200);
    } catch (error) {}
  }

  async update(req, res) {
    try {
      const friend = await find({ id: req.query.id });
      console.log(req.body, 'req body');
      if (!friend) return res.status(404).send({ Message: 'friend does not exist' });

      await update(friend, req.body);

      return successResponse(res, 'updated successfully', friend, 200);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Test;
