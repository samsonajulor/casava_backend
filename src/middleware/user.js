import Tools from '../utils';
import { UserAPIValidations } from '../validations';

const { errorResponse } = Tools;

class User {
  constructor(...args) {
    this.args = args;
  }

  /**
   * Inspect user input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof UserMiddleware
   */
  async inspectGetQuery(req, res, next) {
    try {
      await UserAPIValidations.validateGetQuery(req.query);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect user input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof UserMiddleware
   */
  async inspectDelete(req, res, next) {
    try {
      await UserAPIValidations.validateDelete(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect user input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof UserMiddleware
   */
  async inspectLogin(req, res, next) {
    try {
      await UserAPIValidations.validateLogin(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect user input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof UserMiddleware
   */
  async inspectSignup(req, res, next) {
    try {
      await UserAPIValidations.validateSignUp(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect user input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof UserMiddleware
   */
  async inspectUpdate(req, res, next) {
    try {
      await UserAPIValidations.validateUpdate(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect user input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof UserMiddleware
   */
  async inspectUpdateQuery(req, res, next) {
    try {
      await UserAPIValidations.validateUpdateQuery(req.query);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }
};

export default User;
