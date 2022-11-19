import mongoose from "mongoose";
import { Schema, models, model } from "mongoose";

const BookSchema = new Schema(
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
    excerpt: {
      type: String,
      required: false,
    },
    pages: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
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

export default models.Book || model("Book", BookSchema, "Book");
