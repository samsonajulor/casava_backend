import UserValidations from './user';
import AccountValidations from './account';
import FriendValidations from './account';

const UserAPIValidations = new UserValidations();
const AccountAPIValidations = new AccountValidations();
const FriendAPIValidations = new FriendValidations();

export { UserAPIValidations, AccountAPIValidations, FriendAPIValidations };
