import React, { useState, useRef } from "react";
import Button from "./Button"
import Button2 from "./Button2"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
const API_KEY = "0b27a94bdf5c4630bde61405eb6a0a9d";

function App() {
  const scroll = useRef(null);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [info, setInfo] = useState([])
  const [loader, setLoader] = useState(false)
  const searchRecipes = async () => {
    setLoader(true)
    try {
      if (!query.trim()) {
        return toast.warning("Please enter a search term !", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=100&apiKey=${API_KEY}`
      );

      const data = await res.json();
      setInfo(data)
      if (!data.message) setRecipes(data.results);
      setSelectedRecipe(null); // reset selected recipe when new search happens
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false)
    }
  };

  const saveRecipe = async (recipe) => {
    try {
      const res = await fetch("http://localhost:3000/recipes/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: recipe.title,
          image: recipe.image,
          spoonacularId: recipe.id,
        }),
      });
      const data = await res.json();
      toast(data.message + '❤️', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
      console.error("Error saving recipe:", err);
      toast.warning("Failed to save recipe", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
    }
  };

  const getRecipeDetails = async (id) => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setSelectedRecipe(data);
      toast('scroll down to see the recipe 👇', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.error("Failed to fetch recipe details:", err);
    }
  };

  return (

    <div className="bg-amber-600 w-[100dvw] h-[100dvh]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="color"
        transition={Bounce}
      />
      <h2 className="text-[30px] font-extrabold py-3 text-center">Advanced Recipe Finder</h2>
      <div className="flex justify-center mx-auto mb-5">
        <div className=" w-[90vw] md:w-[50vw]  flex justify-between items-center bg-[rgba(255,255,255,0.3)] p-3 rounded-2xl shadow-lg">
          <input
            type="text"
            className="border p-2 sm:rounded w-[40%] sm:w-[50%] md:w-[45%] text-black rounded-xl"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchRecipes();
              }
            }}
          />
          <div className="flex  gap-1.5 items-center">
            <button className="btn btn-primary" onClick={searchRecipes}>
              Search
            </button>
            <Button />
            <Button2 />
          </div>

        </div>
      </div>
      <div className=" h-[calc(100dvh-160px)] overflow-y-auto">
        <div className="cards-container w-[90vw]  flex flex-wrap gap-4 justify-center mx-auto">
          {loader ? <div>
            <div className="loader h-[70px] w-[70px] mt-30"></div>
          </div> : info.message ? (
            <div className="text-center">Your daily recipe search limit has been reached.<br></br> please come again tomorrow</div>
          ) : info.totalResults === 0 ? <div>Sorry but this recipe not added yet we can add it later</div> : (recipes.map((recipe) => (
            <div key={recipe.id} className="card bg-[rgba(255,255,255,0.2)] border w-[250px] p-3 rounded shadow flex flex-col justify-between">
              <div>
                <img src={recipe.image} alt={recipe.title} className="rounded mb-2" />
                <h5 className="mt-2 text-lg font-semibold">{recipe.title}</h5>
              </div>
              <div>
                <button
                  className="btn btn-success mt-2 mr-2"
                  onClick={() => saveRecipe(recipe)}
                >
                  Save Recipe
                </button>
                <button
                  onClick={() => { getRecipeDetails(recipe.id) }}
                  className="btn btn-secondary mt-2"
                >
                  How to Make It
                </button>
              </div>
            </div>
          )))
          }
        </div>

        {selectedRecipe && (
          <div ref={scroll} className="mt-8 p-4 border rounded shadow bg-white max-w-3xl mx-auto text-black">
            <h2 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full max-w-md mb-4 rounded"
            />
            <p><strong>Ready in:</strong> {selectedRecipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> {selectedRecipe.servings}</p>

            <h3 className="text-xl mt-4 mb-2">Instructions:</h3>
            {selectedRecipe.instructions ? (
              <div
                dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}
                className="prose max-w-none"
              />
            ) : (
              <p>No instructions provided.</p>
            )}

            <h3 className="text-xl mt-4 mb-2">Ingredients:</h3>
            <ul className="list-disc pl-5">
              {selectedRecipe.extendedIngredients?.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;