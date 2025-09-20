import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 1, maxlength: 96 },
        date: { type: String, required: true },
        isDone: { type: Boolean, default: false },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true },
);

export default model('Task', taskSchema);
