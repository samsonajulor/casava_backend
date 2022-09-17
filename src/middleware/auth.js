import jwt from 'jsonwebtoken';
import _ from 'lodash';

import Tools from '../utils';
import UserModel from '../models/user/user.model';

const { find } = new UserModel(),
  { errorResponse } =
  Tools;

class Authenticator {
  constructor(...args) {
    this.args = args;
  }

  async authorize(req, res, next) {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;

      let token, decoded;
      if (authHeader) {
        (token = authHeader.split(' ')[1]), (decoded = jwt.verify(token, process.env.SESSION_SECRET));
      }
      if (token) {
        req.user = decoded;
        let { email } = decoded;
        let user = await find({ email });
        let selected = _.pick(user, ['_id', 'firstName', 'lastName', 'email']);
        req.user = selected;
        next();
      } else {
        return errorResponse(res, 'Not Authenticated!', 401, ':-(')
      }
    } catch (error) {
      return errorResponse(res, 'Authentication failed', 500, error.message);
    }
  }
}

export default Authenticator