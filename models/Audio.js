import mongoose from "mongoose";
import { Schema, models, model } from "mongoose";

const audioSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    format: {
      type: String,
      required: false,
    },
    length: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    date_created: {
      type: Date,
      required: true,
      default: null,
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

export default models.Audio || model("Audio", audioSchema, "Audio");
