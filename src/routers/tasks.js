import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import * as tasksCtrl from '../controllers/tasks.js';
import {
    createTaskSchema,
    updateTaskStatusSchema,
} from '../validation/tasksValidationSchemas.js';
import { isValidId } from '../middlewares/isValidId.js';


const router = Router();

router.use(authenticate);

router.post('/', validateBody(createTaskSchema), tasksCtrl.createTaskController);
router.get('/', tasksCtrl.getTasksController);
router.patch(
    '/:taskId',
    isValidId('taskId'),
    validateBody(updateTaskStatusSchema),
    tasksCtrl.updateTaskStatusController,
);

export default router;
