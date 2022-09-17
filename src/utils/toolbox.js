import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'

import env from '../config/env'

/**
 * Function for api tools methods
 * @function Toolbox
 */
class Tools {
  constructor(...args) {
    this.args = args;
  }

  createToken(email) {
    const payload = { email };

    const token = jwt.sign(payload, env.SESSION_SECRET);

    return token;
  }

  async getEncryptedPassword(key) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(key, salt);

    return hashedPassword;
  }

  async getDecryptedPassword(password, user) {
    const decryptedPassword = await bcrypt.compare(password, user.password);

    return decryptedPassword;
  }

  async getRandomNumber() {
    const randomNumber = crypto.randomBytes(64).toString('hex');

    return randomNumber;
  }

  /**
   *
   * API success response
   * @param {*} res - response.
   * @param {*} responseMessage - api message.
   * @param {*} data - api data.
   * @param {*} code - response code.
   * @returns {object} - api response object
   * @memberof Toolbox
   */
  successResponse(res, responseMessage, data, code = 200) {
    return res.status(code).json({
      status: 'success',
      responseCode: '00',
      responseMessage,
      details: data,
    });
  }

  /**
   * API error response
   * @param {*} res - response.
   * @param {*} responseMessage - api message
   * @param {*} code - response code.
   * @param {*} error - api data.
   * @returns {object} - api response object
   * @memberof Toolbox
   */
  errorResponse(res, responseMessage = 'Some error occurred while processing request.', code = 500, error) {
    return res.status(code).json({
      status: 'fail',
      responseCode: '01',
      responseMessage,
      error,
    });
  }
}

export default Tools;

