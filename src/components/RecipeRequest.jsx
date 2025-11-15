import React from 'react'
import { useRef } from 'react'
import HomeButton from './HomeButton'
import RecipeButton from './RecipeButton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios'
import API from '../config'

const RecipeRequest = () => {
  const input = useRef(null)
  const Request = () => {
    if (input.current.value === "") {
      toast.warning("Please enter a recipe name", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else {
      axios.post(`${API}/recipes/request`, { name: input.current.value })
        .then((res) => {
          toast.success(<div className='capitalize'>{res.data.message}</div>, {
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
          input.current.value = ""
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
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
      <div className='h-[100dvh] bg-amber-400 text-black'>
        <h3 className='font-light text-4xl text-center pt-4'>Request To Add Recipe</h3>
        <div className='mx-auto w-[80dvw] h-[70dvh] bg-amber-200 rounded-md flex flex-col justify-center items-center mt-10'>
          Recipe Name : <input ref={input} type="text" className='border border-black rounded-md m-2 pl-3' />
          <button onClick={Request} className='text-white'>send</button>
        </div>
        <div className='text-center uppercase flex justify-center text-amber-50 mt-5'>
          <HomeButton />
        </div>
        <div className='absolute bottom-2 right-2'>
          <RecipeButton />
        </div>
      </div>
    </>
  )
}

export default RecipeRequest