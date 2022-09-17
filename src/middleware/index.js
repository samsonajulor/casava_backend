import Account from './account';
import User from './user';
import Friend from './friend';
import Authenticator from './auth';

const UserMiddleware = new User();
const AccountMiddleware = new Account();
const FriendMiddleware = new Friend();
const AuthenticatorMiddleware = new Authenticator();

export { UserMiddleware, AccountMiddleware, FriendMiddleware, AuthenticatorMiddleware };
