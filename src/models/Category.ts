import mongoose from "mongoose";

export type CategoryDocument = mongoose.Document & {
  title: string;
};

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});
export const Category = mongoose.model<CategoryDocument>(
  "categories",
  CategorySchema
);
