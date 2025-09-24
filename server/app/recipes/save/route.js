import { connectToDatabase } from "../../lib/mongodb";
import Recipe from "../../models/Recipes";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  const { title, image, spoonacularId } = body;

  if (!title || !spoonacularId) {
    return Response.json({ message: "Missing fields" }, { status: 400, headers: corsHeaders });
  }

  const existing = await Recipe.findOne({ spoonacularId });
  if (existing) {
    return Response.json({ message: "Already saved" }, { status: 200, headers: corsHeaders });
  }

  const newRecipe = new Recipe({ title, image, spoonacularId });
  await newRecipe.save();

  return Response.json({ message: "Recipe saved" }, { status: 201, headers: corsHeaders });
}

export function GET() {
  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
}