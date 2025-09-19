import { Schema, model } from 'mongoose';

const emotionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Emotion = model('emotions', emotionSchema);
