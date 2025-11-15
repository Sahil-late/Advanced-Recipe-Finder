import React, { useEffect, useState, useRef } from "react";
import HomeButton from "./HomeButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios'
import API from '../config'

const FavouritesRecipes = () => {
    const [data, setData] = useState([]);
    const [recipes, setRecipes] = useState([])
    const [recipeInfo, setRecipeInfo] = useState()
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const limit = 10;
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil((data.length / limit))
    useEffect(() => {
        setRecipes(data.slice((currentPage - 1) * limit, limit * currentPage))
    }, [currentPage])

    useEffect(() => {
        setRecipes(data.slice(currentPage - 1, limit))
    }, [data])

    const containerRef = useRef(null);
    const pageRefs = useRef([]);

    useEffect(() => {
        if (pageRefs.current[currentPage - 1]) {
            pageRefs.current[currentPage - 1].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            });
        }
    }, [currentPage]);

    const scroll = useRef(null)
    const hidden = useRef(null)
    const fetchFavourites = async () => {
        try {
            const res = await fetch(`${API}/favourite/recipes`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const apiData = await res.json();
            setData(apiData);
        } catch (err) {
            console.error("Error getting favourites:", err);
            toast.warning("Failed to get recipes", {
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
      const res = await axios.post(`${API}/recipes/recipe_info`,id)
      const data = res.data.extract
      setRecipeInfo(data);
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

    const removeRecipe = (id) => {
        setPendingDeleteId(id);
        hidden.current.classList.remove('hidden');
    };


    useEffect(() => {
        fetchFavourites();
    }, []);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <div className="bg-amber-600 w-[100vw] h-[100dvh]">
                <h2 className="text-3xl font-bold text-center mb-3.5">Favourites Recipes</h2>
                <div ref={hidden} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-amber-950/70 p-4 rounded shadow-lg text-white capitalize hidden" id="confirmDialog">
                    <h2>Are you sure you want to delete this recipe?</h2>
                    <div className="buttons flex justify-end gap-4 mt-4">
                        <button
                            onClick={async () => {
                                hidden.current.classList.add('hidden');
                                if (pendingDeleteId) {
                                    try {
                                        const res = await fetch(`http://localhost:3000/delete/recipe`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ spoonacularId: pendingDeleteId }),
                                        });
                                        const data = await res.json();
                                        toast(
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <p style={{ margin: 0 }}>{data.message}</p>
                                                <img className="invert" src="delete.gif" alt="Toast Icon" style={{ width: 20, height: 20 }} />
                                            </div>,
                                            {
                                                position: "top-right",
                                                autoClose: 2000,
                                                hideProgressBar: true,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "dark",
                                                transition: Bounce,
                                            }
                                        );
                                        fetchFavourites();
                                        setPendingDeleteId(null);
                                    } catch (err) {
                                        console.error("Error deleting recipe:", err);
                                        toast.warning("Failed to delete recipe", {
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
                                }
                            }}
                        >Yes</button>

                        <button
                            onClick={() => {
                                hidden.current.classList.add('hidden');
                                setPendingDeleteId(null);
                            }}
                        >No</button>

                    </div>
                </div>
                {data.length === 0 ? (
                    <p className="text-center">No favourite recipes found.</p>
                ) : (
                    <div className="h-[78.5dvh] w-[100vw]   overflow-y-auto">
                        <div className="flex flex-wraflex flex-wrap gap-4 justify-center mx-auto">
                            {recipes.map((recipe) => (
                                <div key={recipe._id} className="card box-border border w-[250px] p-3 rounded-xl shadow bg-[rgba(255,255,255,0.2)] text-white flex flex-col justify-between">
                                    <div>
                                        <img src={recipe.image} alt={recipe.title} className="rounded-xl mb-2" />
                                        <h3 className="text-lg font-semibold">{recipe.title}</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={() => getRecipeDetails(recipe.spoonacularId)}
                                            className="btn btn-secondary mt-2"
                                        >
                                            How to Make It
                                        </button>
                                        <button
                                            className="btn btn-danger mt-2 ml-2"
                                            onClick={() => removeRecipe(recipe.spoonacularId)}><img className="invert" src='remove.svg' /> </button>
                                    </div>
                                </div>

                            ))}
                        </div>
                        {recipeInfo && (
                            <div ref={scroll} className="mt-8 p-4 border rounded shadow bg-white max-w-3xl mx-auto text-black ">
                                <h2 className="text-2xl font-bold mb-2">{recipeInfo.title}</h2>
                                <img
                                    src={recipeInfo.image}
                                    alt={recipeInfo.title}
                                    className="w-full max-w-md mb-4 rounded"
                                />
                                <p><strong>Ready in:</strong> {recipeInfo.readyInMinutes} minutes</p>
                                <p><strong>Servings:</strong> {recipeInfo.servings}</p>

                                <h3 className="text-xl mt-4 mb-2">Instructions:</h3>
                                {recipeInfo.instructions ? (
                                    <div
                                        dangerouslySetInnerHTML={{ __html: recipeInfo.instructions }}
                                        className="prose max-w-none"
                                    />
                                ) : (
                                    <p>No instructions provided.</p>
                                )}

                                <h3 className="text-xl mt-4 mb-2">Ingredients:</h3>
                                <ul className="list-disc pl-5">
                                    {recipeInfo.extendedIngredients?.map((ing) => (
                                        <li key={ing.id}>{ing.original}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                <div className="text-center pt-2">
                    {currentPage > 1 ? (
                        <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                    ) : (
                        <button disabled className="opacity-80">Prev</button>
                    )}
                    {/* <span className="mx-2">Page {currentPage} of {totalPages}</span> */}
                    <div
                        ref={containerRef}
                        className="inline-flex w-[150px] overflow-x-auto whitespace-nowrap no-scrollbar px-2"
                    >
                        <div className="inline-flex gap-4">
                            {Array.from({ length: totalPages }).map((e, i) => {
                                const pageNum = i + 1;
                                const isActive = pageNum === currentPage;
                                return (
                                    <div
                                        ref={(el) => (pageRefs.current[i] = el)}
                                        key={i}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`flex justify-center items-center cursor-pointer w-8 h-8 rounded-2xl ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                            }`}
                                    >
                                        {pageNum}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {currentPage < totalPages ? (
                        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    ) : (
                        <button disabled className="opacity-80">Next</button>
                    )}
                    <div className="w-full pt-2 flex justify-center items-center"><HomeButton /></div>
                </div>
            </div>
        </>
    );
};

export default FavouritesRecipes;
