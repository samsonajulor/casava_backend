import UserValidations from './user';
import AccountValidations from './account';

const UserAPIValidations = new UserValidations();
const AccountAPIValidations = new AccountValidations();

export { UserAPIValidations, AccountAPIValidations };
