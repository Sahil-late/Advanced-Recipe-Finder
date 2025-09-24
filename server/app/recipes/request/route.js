import { connectToDatabase } from "../../lib/mongodb";
import Recipe from "../../models/RecipeRequests";
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
    const { name } = body;
    let existing = await Recipe.findOne({ title: name })
    if (existing) {
      return Response.json({ message: "Recipe Request Send allready by another user we can add it as soon as possible" }, { status: 201, headers: corsHeaders });
    }
    const newRecipe = new Recipe({ title: name });
    await newRecipe.save();
    return Response.json({ message: "Recipe Request Send Successfully" }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500, headers: corsHeaders });
  }
}
