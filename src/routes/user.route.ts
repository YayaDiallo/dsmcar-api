import { userController } from '@/controllers/index.js';
import { userInsertSchema, userUpdateSchema } from '@/db/schema/user.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import express from 'express';

export const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  userController.getById,
);
userRouter.post(
  '/',
  validateRequest({ body: userInsertSchema }),
  userController.create,
);
userRouter.patch(
  '/:id',
  validateRequest({ params: ParamsWithId, body: userUpdateSchema }),
  userController.update,
);
userRouter.delete(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  userController.delete,
);
