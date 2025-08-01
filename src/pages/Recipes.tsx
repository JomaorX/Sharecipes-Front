import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { api } from '../api';


const Recipes = () => {

  const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      api.get('/recipes')
        .then(res => setRecipes(res.data))
        .catch(err => console.error('Error cargando categorías', err));
    }, []);

  return (
    <div>
      <h2>Recetas Públicas</h2>
      <div className='recipes-grid'>
      <RecipeCard recipes={recipes}></RecipeCard>
      </div>
    </div>
  );
};

export default Recipes;
