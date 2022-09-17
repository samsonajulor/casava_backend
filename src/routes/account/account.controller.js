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
      const { status, username, userId } = req.body;

      // Check if the user already exist in the database
      let user = await findUser({ userId });

      if (!user) return res.status(400).send({ Message: 'User does not exist' });

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

      !account && errorResponse(res, 'no such account', 400, ':-(');

      await remove({ username: req.body.username });

      return successResponse(res, 'account removed successfully', ':-)', 200);
    } catch (error) {}
  }

  async update(req, res) {
    try {
      const account = await find({ accountId: req.query.accountId });
      console.log(req.body, 'req body');
      if (!account) return res.status(404).send({ Message: 'Account does not exist' });

      await update(account, req.body);

      return successResponse(res, 'account updated successfully', account, 200);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Test;
