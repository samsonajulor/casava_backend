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

  async get(req, res) {
    try {
      const account = await find({ accountId: req.query.accountId });
      if (!account || account.length == 0)
        return res.status(404).send({ Message: 'Account does not exist. You might need to create one' });

      return successResponse(res, 'account(s) retrieved successfully', account, 200);
    } catch (error) {
      console.log(error);
    }
  }

  async create(req, res) {
    try {
      const { status, username, userId } = req.body;

      // Check if the user already exist in the database
      let user = await findUser({ userId });
      if (user._id.toString() !== userId) return res.status(400).send({ Message: 'No such user' });

      // Check if the username already exist in the database
      let oldAccount = await find({ username });
      if (oldAccount) return res.status(400).send({ Message: 'Username is taken' });

      const newAccount = await create({
        status,
        username,
        userId,
      });

      return successResponse(res, 'account created successfully', newAccount, 201);
    } catch (error) {
      await remove({ email: req.body.email });
      return errorResponse(res, 'Some error occurred', 500, error.message);
    }
  }

  async remove(req, res) {
    try {
      const account = await find({ username: req.body.username });

      console.log(account)

      (!account || account.length === 0) && errorResponse(res, 'no such account', 400, ':-(');

      await remove({ username: req.body.username });

      return successResponse(res, 'account removed successfully', ':-)', 200);
    } catch (error) {}
  }

  async update(req, res) {
    try {
      const account = await find({ accountId: req.query.accountId });

      if (!account || req.query.accountId !== account._id.toString()) return res.status(404).send({ Message: 'Account does not exist' });

      await update(account, req.body);

      return successResponse(res, 'account updated successfully', account, 200);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Test;
