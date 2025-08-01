import { useEffect, useState } from 'react'
import { api } from '../api';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../types/Recipe';

type Props = {}

function Favorites({}: Props) {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get('/favorites')
      .then((res) => {
        const favoriteRecipes = res.data.map((favorite: { recipe: Recipe; }) => favorite.recipe);
      setRecipes(favoriteRecipes);
        console.log("Mis favoritos", favoriteRecipes);
      })
      .catch(err => console.error('Error cargando categorías', err));
  }, []);


  return (
    <div className='recipes-grid'>
      <RecipeCard recipes={recipes}></RecipeCard>
    </div>
  )
}

export default Favorites