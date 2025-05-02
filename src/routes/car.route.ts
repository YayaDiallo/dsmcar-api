import { carController } from '@/controllers/index.js';
import { carInsertSchema, carUpdateSchema } from '@/db/schema/car.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import express from 'express';

export const carRouter = express.Router();

carRouter.get('/', carController.getCollection);
carRouter.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  carController.getById,
);
carRouter.post(
  '/',
  validateRequest({ body: carInsertSchema }),
  carController.create,
);
carRouter.patch(
  '/:id',
  validateRequest({ params: ParamsWithId, body: carUpdateSchema }),
  carController.update,
);
carRouter.delete(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  carController.delete,
);
