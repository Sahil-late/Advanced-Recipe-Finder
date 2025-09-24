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

export async function GET(request) {
    try {
        await connectToDatabase();
        const Recipes = await Recipe.find({});
        return Response.json(Recipes, { headers: corsHeaders });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Server error" }, { status: 500, headers: corsHeaders });
    }
}
