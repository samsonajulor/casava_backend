import User from './user';
import Authenticator from './auth';

const UserMiddleware = new User();
const AuthenticatorMiddleware = new Authenticator();

export { UserMiddleware, AuthenticatorMiddleware };
