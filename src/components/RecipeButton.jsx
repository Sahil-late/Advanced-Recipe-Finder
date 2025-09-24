import React from 'react'
import { Link } from 'react-router-dom';
const RecipeButton = () => {
    return (
        <div>
            <Link to='/UserRequestedRecipes'>
                <div className='flex justify-center p-2 bg-green-400 w-fit rounded-full active:border-2 active:border-blue-700 hover:scale-97 transition-all duration-200'>
                    <img width="25" height="25" src="https://img.icons8.com/color/48/curry.png" alt="curry" />
                </div>
            </Link>
        </div>
    )
}

export default RecipeButton
