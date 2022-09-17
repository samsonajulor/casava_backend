import UserModel from '../../models/user/user.model';
import Tools from '../../utils';

const { update, find, create, remove } = new UserModel();
const { getEncryptedPassword, getDecryptedPassword, errorResponse, successResponse, createToken } = Tools;

class Test {
  constructor(...args) {
    this.args = args;
  }

  async get(req, res) {
    try {
      const user = await find({ userId: req.query.userId });
      if (!user || user.length == 0)
        return errorResponse(res, 'User does not exist. You might need to create one', 404, ':-(');

      return successResponse(res, 'user(s) retrieved successfully', user, 200);
    } catch (error) {
      return errorResponse(res, 'Some error occurred', 500, error.message);
    }
  }

  async remove(req, res) {
    try {
      const user = await find({ email: req.body.email });

      if (!user || user.length == 0) return errorResponse(res, 'no such user', 400, ':-(');

      await remove({ email: req.body.email });

      return successResponse(res, 'user removed successfully', ':-)', 200);
    } catch (error) {
      return errorResponse(res, 'Some error occurred', 500, error.message);
    }
  }

  async update(req, res) {
    try {
      const user = await find({ userId: req.query.userId });
      if (!user) return errorResponse(res, 'User does not exist.', 404, ':-(');

      await update(user, req.body);

      return successResponse(res, 'user updated successfully', user, 200);
    } catch (error) {
      return errorResponse(res, 'Some error occurred', 500, error.message);
    }
  }

  async signUp(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      // Check if the user already exist in the database
      let user = await find({ email });

      if (user) return errorResponse(res, 'User already exists.', 400, ':-(');

      const hashedPassword = await getEncryptedPassword(password);

      const newUser = await create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountId: '',
      });

      return successResponse(res, 'user created successfully', newUser, 201);
    } catch (error) {
      await remove({ email: req.body.email });
      return errorResponse(res, 'Some error occurred', 500, error.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if the user already exist in the database
      const user = await find({ email });
      if (!user) return res.status(404).send({ Message: 'User not found' });

      // Decrypt the user password and compare
      const validPassword = await getDecryptedPassword(password, user);

      if (!validPassword) return res.status(401).send({ Message: 'User is not authorized' });

      const token = createToken(email);

      res.cookie('token', token, { maxAge: 10 * 1000, httpOnly: true }); //10 MINS

      return successResponse(res, 'User successfully login', token, 200);
    } catch (error) {
      return errorResponse(res, 'Some error occurred', 500, error.message);
    }
  }
}

export default Test;
