import * as tasksService from '../services/tasks.js';
import createHttpError from 'http-errors';

export const createTaskController = async (req, res) => {
    const { _id: owner } = req.user;
    const task = await tasksService.createTask(req.body, owner);

    res.status(201).json({
        status: 201,
        message: 'Task successfully created!',
        data: task,
    });
};

export const getTasksController = async (req, res) => {
    const { _id: owner } = req.user;
    const tasks = await tasksService.getTasks(owner);

    res.status(200).json({
        status: 200,
        message: 'Successfully fetched tasks!',
        data: tasks,
    });
};

export const updateTaskStatusController = async (req, res) => {
    const { taskId } = req.params;
    const { isDone } = req.body;

    const task = await tasksService.updateTaskStatus(taskId, req.user._id, isDone);

    if (!task) {
        throw createHttpError(404, 'Task not found');
    }

    res.status(200).json({
        status: 200,
        message: 'Task status successfully updated!',
        data: task,
    });
};
