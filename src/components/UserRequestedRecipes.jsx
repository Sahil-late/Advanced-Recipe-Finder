import React from 'react'
import { useEffect , useState } from 'react'
import HomeButton from './HomeButton'
import  Axios  from 'axios'

const UserRequestedRecipes = () => {
  const [data, setData] = useState([]);

  const recipes = async () => {
    Axios.get('http://localhost:3000/access/requested')
      .then((Recipes) => {
        console.log(Recipes.data);
        setData(Recipes.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }


  useEffect(() => {
    recipes();
  }, []);
  return (
    <div className='h-[100dvh] bg-amber-600'>
      <h3 className='text-4xl text-center py-4'>User Requested Recipes</h3>
      <div className='h-[80dvh] overflow-y-auto '>
        {data.length === 0 && <h3 className='text-2xl text-center'>No Recipes Requested</h3>}
        {
        data.map((recipe)=>(
          <div key={recipe._id} className='border-2 border-black m-4 p-4 rounded-lg bg-amber-300'>
            <h4 className='text-2xl font-bold'>Recipe Name: {recipe.title}</h4>
          </div>
        ))
      }
      </div>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
        <HomeButton />
      </div>
    </div>
  )
}

export default UserRequestedRecipes