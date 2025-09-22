import React from 'react'
import { Link } from "react-router-dom";
const Button2 = () => {
  return (
    <Link to="/RecipeRequest">
      <button className=" flex items-center">
        <img className=" invert" width={25} height={25} src="\icons8-add-50.png" alt="Add" />
      </button>
    </Link>
  )
}

export default Button2