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

export async function GET() {
  await connectToDatabase();
  const existing = await Recipe.find({});
  
  return Response.json( existing , { status: 200, headers: corsHeaders });
}
