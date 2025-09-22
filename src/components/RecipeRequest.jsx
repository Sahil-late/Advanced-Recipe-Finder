import React from 'react'
import { useRef } from 'react'
import HomeButton from './HomeButton'
import axios from 'axios'

const RecipeRequest = () => {
  const input = useRef(null)
  const Request = () => {
    if (input.current.value === "") {
      alert("Please enter a recipe name")
    }
    else {
      axios.post("http://localhost:3000/recipes/request", { name: input.current.value })
        .then((res) => {
          alert(res.data.message)
          input.current.value = ""
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <div className='h-screen bg-amber-400 text-black'>
        <h3 className='font-light text-4xl text-center'>Request To Add Recipe</h3>
        <div className='mx-auto w-[80dvw] h-[70dvh] bg-amber-200 rounded-md flex flex-col justify-center items-center mt-10'>
          Recipe Name : <input ref={input} type="text" className='border border-black rounded-md m-2 pl-3' />
          <button onClick={Request} className='text-white'>send</button>
        </div>
        <div className='text-center uppercase flex justify-center text-amber-50 mt-5'>
          <HomeButton/>
        </div>
      </div>
    </>
  )
}

export default RecipeRequest