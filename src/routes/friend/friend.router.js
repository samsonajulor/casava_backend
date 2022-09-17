import { Router } from 'express';

import { AuthenticatorMiddleware } from '../../middleware';
import { FriendMiddleware } from '../../middleware';

import FriendController from './friend.controller';

const { update, remove, create, get } = new FriendController(),
  friendRouter = Router(),
  { authorize } = AuthenticatorMiddleware,
  { inspectDelete, inspectGetQuery, inspectUpdate, inspectUpdateQuery, inspectCreate } = FriendMiddleware;

friendRouter.post('/create', authorize, inspectCreate, create);
friendRouter.get('/get', authorize, inspectGetQuery, get);
friendRouter.put('/edit', authorize, inspectUpdate, inspectUpdateQuery, update);
friendRouter.delete('/del', authorize, inspectDelete, remove);

export default friendRouter;
