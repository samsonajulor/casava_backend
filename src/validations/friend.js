import Joi from 'joi';
import joiDate from '@joi/date';

const joi = Joi.extend(joiDate);

class FriendValidations {
  constructor(...args) {
    this.args = args;
  }

  /**
   * validate friend input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof FriendValidations
   */
  async validateGetQuery(payload) {
    const schema = joi.object({
      friendId: joi.string().optional().label('invalid or missing friend id'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate friend input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof FriendValidations
   */
  async validateUpdateQuery(payload) {
    const schema = joi.object({
      friendId: joi.string().required().label('invalid or missing account id'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate friend input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof FriendValidations
   */
  async validateCreate(payload) {
    const schema = joi.object({
      accountId: joi.string().required().label('invalid or missing accountId'),
      userId: joi.string().required().label('invalid or missing userId'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate friend input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof FriendValidations
   */
  async validateUpdate(payload) {
    const schema = joi.object({
      canViewStatus: joi.string().required().label('invalid or missing canViewStatus'),
      isFavorite: joi.string().required().label('invalid or missing isFavorite'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate friend input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof UserValidations
   */
  async validateDelete(payload) {
    const schema = joi.object({
      friendId: joi.string().required().label('invalid or missing friend'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }
}

export default FriendValidations;
