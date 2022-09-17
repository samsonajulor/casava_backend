import { Router } from 'express';

import userRouter from './user/user.router';
import accountRouter from './account/account.router';

const api = Router();

api.use('/user', userRouter);
api.use('/account', accountRouter);

export default api;