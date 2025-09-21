import { Schema, model } from 'mongoose';

const diarySchema = new Schema(
  {
    title: { type: String, required: true, minlength: 1, maxlength: 64 },

    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },

    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    emotions: [{ type: Schema.Types.ObjectId, ref: 'Emotion', required: true }],

    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const DiaryCollection = model('Diary', diarySchema);
