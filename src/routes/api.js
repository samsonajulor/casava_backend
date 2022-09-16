import { Router } from 'express';

import userRouter from './user.router';

const api = Router();

api.use('/user', userRouter);

export default api;