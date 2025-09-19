import { Schema, model } from 'mongoose';

const babyStatesSchema = new Schema(
  {
    analogy: {
      type: String,
      required: true,
      default: null,
    },
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    babySize: {
      type: Number,
      required: true,
    },
    babyWeight: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    babyActivity: {
      type: String,
      required: true,
    },
    babyDevelopment: {
      type: String,
      required: true,
    },
    interestingFact: {
      type: String,
    },
    momDailyTips: {
      type: [String],
      default: [],
    },
  },
  { timestamps: false },
);

export const BabyStatesCollection = model('baby_states', babyStatesSchema);
