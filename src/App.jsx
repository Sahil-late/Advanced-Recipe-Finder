import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FavouritesRecipes from "./components/FavouritesRecipes";
import RecipeRequest from "./components/RecipeRequest";
import Home from "./components/Home";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/FavouritesRecipes" element={<FavouritesRecipes />} />
      <Route path="/RecipeRequest" element={<RecipeRequest />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App