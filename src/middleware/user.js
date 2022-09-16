import Tools from '../utils';
import APIValidations from '../validations';

const { errorResponse } = Tools;

class User {
  constructor(...args) {
    this.args = args;
  }

  /**
   * Inspect query string
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof UserMiddleware
   */
  async inspectSomething(req, res, next) {
    try {
      await APIValidations.validateUserQuery(req.query);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }
};

export default User;
