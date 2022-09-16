import jwt from 'jsonwebtoken';
import _ from 'lodash';

import Tools from '../utils';
import { UserService } from '../service';

const { findOne } = UserService,
  { errorResponse, successResponse } =
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
        let user = await findOne({ email });
        let selected = _.pick(user, ['_id', 'firstName', 'lastName', 'email']);
        req.user = selected;
        next();
      } else {
        return res.status(401).json('Not Authenticated!');
      }
    } catch (error) {
      console.log(error, 'error found');
      res.status(404).json({
        message: 'Authentication failed',
      });
    }
  }
}

export default Authenticator