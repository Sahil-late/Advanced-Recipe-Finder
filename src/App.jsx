import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FavouritesRecipes from "./components/FavouritesRecipes";
import RecipeRequest from "./components/RecipeRequest";
import UserRequestedRecipes from "./components/UserRequestedRecipes";
import Home from "./components/Home";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/FavouritesRecipes" element={<FavouritesRecipes />} />
      <Route path="/RecipeRequest" element={<RecipeRequest />} />
      <Route path="/UserRequestedRecipes" element={<UserRequestedRecipes />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App