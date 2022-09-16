import { Router } from 'express';

import { AuthenticatorMiddleware } from '../middleware';
import { UserMiddleware } from '../middleware';

import { UserController } from '../controller';

const { update, signUp, remove, login } = UserController,
  userRouter = Router(),
  { authorize } = AuthenticatorMiddleware;

userRouter.post('/signup', signUp);
userRouter.put('/edit', authorize, update);
userRouter.post('/login', authorize, login);
userRouter.delete('/del', authorize, remove);

export default userRouter;
