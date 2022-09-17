import { Router } from 'express';

import userRouter from './user/user.router';
import accountRouter from './account/account.router';
import friendRouter from './friend/friend.router';

const api = Router();

api.use('/user', userRouter);
api.use('/account', accountRouter);
api.use('/friend', friendRouter);

export default api;