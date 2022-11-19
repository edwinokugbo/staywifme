import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Category || model("Category", categorySchema, "Category");
