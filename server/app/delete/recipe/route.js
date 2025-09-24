import { connectToDatabase } from "../../lib/mongodb";
import Recipes from "../../models/Recipes";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const {  spoonacularId : id } = body;
    console.log("Received spoonacularId:", id);
    let existing = await Recipes.findOne({spoonacularId:id});
    console.log(existing)
    const result = await Recipes.deleteOne(existing);
    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return Response.json({ message: "No recipe found to delete" }, { status: 404, headers: corsHeaders });
    }

    return Response.json({ message: "Recipe deleted successfully" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ message: "Server error" }, { status: 500, headers: corsHeaders });
  }
}
