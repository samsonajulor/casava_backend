import Account from './account';
import User from './user';
import Authenticator from './auth';

const UserMiddleware = new User();
const AccountMiddleware = new Account();
const AuthenticatorMiddleware = new Authenticator();

export { UserMiddleware, AccountMiddleware, AuthenticatorMiddleware };
