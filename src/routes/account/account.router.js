import { Router } from 'express';

import { AuthenticatorMiddleware } from '../../middleware';
import { AccountMiddleware } from '../../middleware';

import AccountController from './account.controller';

const { update, remove, create, get } = new AccountController(),
  accountRouter = Router(),
  { authorize } = AuthenticatorMiddleware,
  { inspectDelete, inspectGetQuery, inspectUpdate, inspectUpdateQuery, inspectCreate } = AccountMiddleware;

accountRouter.post('/create', authorize, inspectCreate, create);
accountRouter.put('/edit', authorize, inspectUpdate, inspectUpdateQuery, update);
accountRouter.get('/get', authorize, inspectGetQuery, get);
accountRouter.delete('/del', authorize, inspectDelete, remove);

export default accountRouter;
