import mongoose from "mongoose";

const RecipeRequestsSchema = new mongoose.Schema({
  title: String,
});
export default mongoose.models.RecipeRequests || mongoose.model("RecipeRequests", RecipeRequestsSchema);