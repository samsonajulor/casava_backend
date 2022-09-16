import { UserService } from '../service';
import Tools from '../../utils';

const { update, findAll, findOne, create, remove } = UserService;
const { getEncryptedPassword, getDecryptedPassword, getRandomNumber, errorResponse, successResponse, createToken } = Tools;

class Test {
  constructor(...args) {
    this.args = args;
  }

  async remove(req, res) {
    try {
      const user = await findOne({ email: req.body.email });

      !user && errorResponse(res, 'no such user', 400, ':-(');

      await remove({ email: req.body.email });

      return successResponse(res, 'user removed successfully', ':-)', 200);
    } catch (error) {}
  }

  async update(req, res) {
    try {
      const user = await findOne({ userId: req.query.userId });
      if (!user) return res.status(404).send({ Message: 'User does not exist' });

      await update(user, req.body);

      return successResponse(res, 'user updated successfully', user, 200);
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      // Check if the user already exist in the database
      let user = await findOne({ email });

      if (user) return res.status(400).send({ Message: 'User already exist' });

      const hashedPassword = await getEncryptedPassword(password),

      const newUser = await create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountId,
        friendList: []
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
      const user = await findOne({ email });
      if (!user) return res.status(404).send({ Message: 'User not found' });

      // Decrypt the user password and compare
      const validPassword = await getDecryptedPassword(password, user);

      if (!validPassword) return res.status(401).send({ Message: 'User is not authorized' });

      const token = createToken(email);

      console.log(token)

      res.cookie('token', token, { maxAge: 10 * 1000, httpOnly: true }); //10 MINS

      res.status(200).send({ Message: 'User successfully login', token });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default Test;
