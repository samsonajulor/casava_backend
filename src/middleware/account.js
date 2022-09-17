import Tools from '../utils';
import { AccountAPIValidations } from '../validations';

const { errorResponse } = Tools;

class Account {
  constructor(...args) {
    this.args = args;
  }

  /**
   * Inspect account input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof AccountMiddleware
   */
  async inspectGetQuery(req, res, next) {
    try {
      await AccountAPIValidations.validateGetQuery(req.query);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect account input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof AccountMiddleware
   */
  async inspectDelete(req, res, next) {
    try {
      await AccountAPIValidations.validateDelete(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect account input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof AccountMiddleware
   */
  async inspectUpdate(req, res, next) {
    try {
      await AccountAPIValidations.validateUpdate(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect account input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof AccountMiddleware
   */
  async inspectUpdateQuery(req, res, next) {
    try {
      await AccountAPIValidations.validateUpdateQuery(req.query);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect account input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof AccountMiddleware
   */
  async inspectCreate(req, res, next) {
    try {
      await AccountAPIValidations.validateCreate(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }
};

export default Account;
