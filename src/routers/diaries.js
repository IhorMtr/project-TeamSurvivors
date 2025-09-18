import { Router } from 'express';
import * as s from '../controllers/diaries.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  diariesValidationSchemaCreate,
  diariesValidationSchemaUpdate,
} from '../validation/diariesValidationSchemas.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

// router.use(authenticate);

router.post(
  '/',
  validateBody(diariesValidationSchemaCreate),
  s.createEntryDiariesController,
);

router.get('/', s.getAllEntriesDiaryController);

router.get('/:entryId', isValidId, s.getEntryByIdController);

router.delete('/:entryId', isValidId, s.deleteEntryByIdController);

router.patch(
  '/:entryId',
  validateBody(diariesValidationSchemaUpdate),
  s.updateEntryDiariesController,
);

export default router;
