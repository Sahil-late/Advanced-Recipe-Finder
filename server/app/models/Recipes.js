import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  spoonacularId:Number,
});

export default mongoose.models.Recipes || mongoose.model("Recipes", RecipeSchema);