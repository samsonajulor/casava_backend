import { Router } from 'express';

import { AuthenticatorMiddleware } from '../../middleware';
import { UserMiddleware } from '../../middleware';

import UserController from './user.controller';

const { update, signUp, remove, login, get } = new UserController(),
  userRouter = Router(),
  { authorize } = AuthenticatorMiddleware,
  { inspectDelete, inspectUpdate, inspectLogin, inspectSignup, inspectGetQuery, inspectUpdateQuery } = UserMiddleware;

userRouter.post('/signup', inspectSignup, signUp);
userRouter.post('/login', inspectLogin, login);
userRouter.get('/get', authorize, inspectGetQuery, get);
userRouter.put('/edit', authorize, inspectUpdate, inspectUpdateQuery, update);
userRouter.delete('/del', authorize, inspectDelete, remove);

export default userRouter;
