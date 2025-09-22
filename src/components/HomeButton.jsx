import React from 'react'
import { Link } from 'react-router-dom'
const HomeButton = () => {
  return (
    <Link to="/">
      <div className="bg-black w-fit rounded-2xl px-4 py-1 shadow hover:bg-gray-900 transition duration-300 active:border-2 active:border active:border-gray-500">
         back to home page
      </div>
    </Link>
  )
}

export default HomeButton