import { Schema, model } from 'mongoose';

export const diarySchema = new Schema(
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

    emotions: {
      type: [Schema.Types.ObjectId],
      ref: 'emotions',
      required: true,
      validate: [
        (arr) => arr.length >= 1 && arr.length <= 12,
        'Emotions must have between 1 and 12 items',
      ],
    },

    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Diary = model('diaries', diarySchema);
