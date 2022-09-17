import { Router } from 'express';

import { AuthenticatorMiddleware } from '../../middleware';
import { FriendMiddleware } from '../../middleware';

import FriendController from './friend.controller';

const { update, remove, create, get } = new FriendController(),
  friendRouter = Router(),
  { authorize } = AuthenticatorMiddleware;

friendRouter.post('/create', authorize, create);
friendRouter.get('/get', authorize, get);
friendRouter.put('/edit', authorize, update);
friendRouter.delete('/del', authorize, remove);

export default friendRouter;
