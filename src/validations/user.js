import Joi from 'joi';
import joiDate from '@joi/date';

const joi = Joi.extend(joiDate);

class UserValidations {
  constructor(...args) {
    this.args = args;
  }

  /**
   * validate user input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof UserValidations
   */
  async validateGetQuery(payload) {
    const schema = joi.object({
      userId: joi.string().optional().label('invalid or missing user id'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate user input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof UserValidations
   */
  async validateUpdateQuery(payload) {
    const schema = joi.object({
      userId: joi.string().required().label('invalid or missing user id'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate user input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof UserValidations
   */
  async validateLogin(payload) {
    const schema = joi.object({
      email: joi.string().required().label('invalid or missing email address'),
      password: joi.string().min(8).max(50).required().label('invalid or missing password'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate user input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof UserValidations
   */
  async validateSignUp(payload) {
    const schema = joi.object({
      firstName: joi.string().required().label('invalid or missing firstName'),
      lastName: joi.string().required().label('invalid or missing lastName'),
      email: joi.string().required().label('invalid or missing email address'),
      password: joi.string().min(8).max(50).required().label('invalid or missing password'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate user input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof UserValidations
   */
  async validateUpdate(payload) {
    const schema = joi.object({
      firstName: joi.string().required().label('invalid or missing firstName'),
      lastName: joi.string().required().label('invalid or missing lastName'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }

  /**
   * validate user input
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof UserValidations
   */
  async validateDelete(payload) {
    const schema = joi.object({
      email: joi.string().required().label('invalid or missing email'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }
};

export default UserValidations;
