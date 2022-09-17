import UserModel from '../../models/user/user.model';
import AccountModel from '../../models/account/account.model';
import Tools from '../../utils';

const { find: findUser } = new UserModel();
const { update, find, create, remove } = new AccountModel();
const { errorResponse, successResponse } = Tools;

class Account {
  constructor(...args) {
    this.args = args;
  }

  async get(req, res) {
    try {
      const account = await find({ accountId: req.query.accountId });
      if (!account || account.length == 0)
        return errorResponse(res, 'Account does not exist, you might need to create one.', 404, ':-(');

      return successResponse(res, 'account(s) retrieved successfully', account, 200);
    } catch (error) {
      return errorResponse(res, 'Some error occurred.', 500, error.message);
    }
  }

  async create(req, res) {
    try {
      const { status, username, userId } = req.body;

      // Check if the user already exist in the database
      let user = await findUser({ userId });
      if (user._id.toString() !== userId) return errorResponse(res, 'no such user', 400, ':-(');

      // Check if the username already exist in the database
      let oldAccount = await find({ username });
      if (oldAccount) return errorResponse(res, 'username is taken', 400, ':-(');

      const newAccount = await create({
        status,
        username,
        userId,
      });

      return successResponse(res, 'account created successfully', newAccount, 201);
    } catch (error) {
      await remove({ email: req.body.email });
      return errorResponse(res, 'Some error occurred.', 500, error.message);
    }
  }

  async remove(req, res) {
    try {
      const account = await find({ username: req.body.username });

      if (!account || account.length === 0) return errorResponse(res, 'no such account', 400, ':-(');

      await remove({ username: req.body.username });

      return successResponse(res, 'account removed successfully', ':-)', 200);
    } catch (error) { 
      return errorResponse(res, 'Some error occurred.', 500, error.message);
    }
  }

  async update(req, res) {
    try {
      const account = await find({ accountId: req.query.accountId });

      if (!account || req.query.accountId !== account._id.toString())
        return errorResponse(res, 'Account does not exist', 404, ':-(');

      await update(account, req.body);

      return successResponse(res, 'account updated successfully', account, 200);
    } catch (error) {
      return errorResponse(res, 'Some error occurred.', 500, error.message);
    }
  }
}

export default Account;
