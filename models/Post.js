import mongoose from "mongoose";
import { Schema, models, model } from "mongoose";
import User from "models/User";
import Category from "models/Category";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    category: {
      type: Schema.ObjectId,
      required: false,
      ref: "Category",
    },
    content: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateModified: {
      type: Date,
    },
    featuredImage: {
      type: String,
    },
    author: {
      type: Schema.ObjectId,
      required: false,
      ref: User,
    },
    views: {
      type: Number,
    },
    draft: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default models.Post || model("Post", postSchema, "Post");
