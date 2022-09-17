import Tools from '../utils';
import { FriendAPIValidations } from '../validations';

const { errorResponse } = Tools;

class Friend {
  constructor(...args) {
    this.args = args;
  }

  /**
   * Inspect friend input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof FriendMiddleware
   */
  async inspectGetQuery(req, res, next) {
    try {
      await FriendAPIValidations.validateGetQuery(req.query);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect friend input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof FriendMiddleware
   */
  async inspectDelete(req, res, next) {
    try {
      await FriendAPIValidations.validateDelete(req.query);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect friend input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof FriendMiddleware
   */
  async inspectUpdate(req, res, next) {
    try {
      await FriendAPIValidations.validateUpdate(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect friend input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof FriendMiddleware
   */
  async inspectUpdateQuery(req, res, next) {
    try {
      await FriendAPIValidations.validateUpdateQuery(req.query);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }

  /**
   * Inspect friend input
   * @param {*} req - request body
   * @param {*} res - response body
   * @param {*} next - next object
   * @returns {object} - returns error or response object
   * @memberof FriendMiddleware
   */
  async inspectCreate(req, res, next) {
    try {
      await FriendAPIValidations.validateCreate(req.body);
      next();
    } catch (error) {
      return errorResponse(res, error, 500, null);
    }
  }
};

export default Friend;
