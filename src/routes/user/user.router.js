import { Router } from 'express';

import { AuthenticatorMiddleware } from '../../middleware';
import { UserMiddleware } from '../../middleware';

import UserController from './user.controller';

const { update, signUp, remove, login } = new UserController(),
  userRouter = Router(),
  { authorize } = AuthenticatorMiddleware;

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.put('/edit', authorize, update);
userRouter.delete('/del', authorize, remove);

export default userRouter;
