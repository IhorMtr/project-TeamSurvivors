import Task from '../db/models/taskSchema.js';

export const createTask = async (data, ownerId) => {
    return Task.create({ ...data, owner: ownerId });
};

export const getTasks = async (ownerId) => {
    return Task.find({ owner: ownerId });
};

export const updateTaskStatus = async (taskId, ownerId, isDone) => {
    return Task.findOneAndUpdate(
        { _id: taskId, owner: ownerId },
        { isDone },
        { new: true },
    );
};
