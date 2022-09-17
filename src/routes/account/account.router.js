import { Router } from 'express';

import { AuthenticatorMiddleware } from '../../middleware';
import { AccountMiddleware } from '../../middleware';

import AccountController from './account.controller';

const { update, remove, create, get } = new AccountController(),
  accountRouter = Router(),
  { authorize } = AuthenticatorMiddleware;

accountRouter.post('/create', authorize, create);
accountRouter.put('/edit', authorize, update);
accountRouter.get('/get', authorize, get);
accountRouter.delete('/del', authorize, remove);

export default accountRouter;
