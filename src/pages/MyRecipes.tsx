import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { api } from '../api';
import './css/mrecipes.css'

type Props = {}

function MyRecipes({}: Props) {
const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get('/myrecipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error('Error cargando categorías', err));
  }, []);

  return (
    <div className='recipes-grid'>
      <RecipeCard recipes={recipes}></RecipeCard>
    </div>
  )
}

export default MyRecipes