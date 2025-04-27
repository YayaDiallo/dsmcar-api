import { activityController } from '@/controllers/index.js';
import {
  activityInsertSchema,
  activityUpdateSchema,
} from '@/db/schema/activity.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import express from 'express';

export const activityRouter = express.Router();

activityRouter.get('/', activityController.getAll);
activityRouter.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  activityController.getById,
);
activityRouter.post(
  '/',
  validateRequest({ body: activityInsertSchema }),
  activityController.create,
);
activityRouter.patch(
  '/:id',
  validateRequest({ params: ParamsWithId, body: activityUpdateSchema }),
  activityController.update,
);
activityRouter.delete(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  activityController.delete,
);
