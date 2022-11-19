import mongoose from "mongoose";
import { Schema, models, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    plan: {
      type: Number,
      required: false,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
    },
    date_created: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    date_modified: {
      type: Date,
      required: false,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

export default models.Subscription ||
  model("Subscription", subscriptionSchema, "Subscription");
