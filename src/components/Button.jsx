import React from "react";
import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link to="/FavouritesRecipes">
      <button className=" flex items-center ">
        <img className="fav" width={25} height={25} src="favorite-48.png" alt="Favourites" />
      </button>
    </Link>
  );
};

export default Button;
