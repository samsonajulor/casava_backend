import Joi from 'joi';
import joiDate from '@joi/date';

const joi = Joi.extend(joiDate);

class AccountValidations {
  constructor(...args) {
    this.args = args;
  }

  /**
   * validate account input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof AccountValidations
   */
  async validateGetQuery(payload) {
    const schema = joi.object({
      accountId: joi.string().optional().label('invalid or missing account id'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate account input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof AccountValidations
   */
  async validateUpdateQuery(payload) {
    const schema = joi.object({
      accountId: joi.string().required().label('invalid or missing account id'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate account input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof AccountValidations
   */
  async validateCreate(payload) {
    const schema = joi.object({
      username: joi.string().required().label('invalid or missing username'),
      userId: joi.string().required().label('invalid or missing userId'),
      status: joi.string().required().label('invalid or missing status'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate account input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof AccountValidations
   */
  async validateUpdate(payload) {
    const schema = joi.object({
      status: joi.string().required().label('invalid or missing status'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate account input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof UserValidations
   */
  async validateDelete(payload) {
    const schema = joi.object({
      username: joi.string().required().label('invalid or missing username'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }
}

export default AccountValidations;
