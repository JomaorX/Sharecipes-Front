import { useEffect, useState } from 'react'
import { api } from '../api';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../types/Recipe';
import './css/mrecipes.css';
import BasicPagination from '../components/Pagination';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {}

function Favorites({}: Props) {

  const [total, setTotal] = useState<number>(10);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecipes = (page: number) => {
    setLoading(true);
    console.log("Pasando a la pagina", page);
    api.get(`/favorites?page=${page}`)
        .then((res) => {
          const favoriteRecipes = res.data.data.map((favorite: { recipe: Recipe; }) => favorite.recipe);
      setRecipes(favoriteRecipes);
          console.log("Esto es res", res.data);
        }
        )
        .catch(err => console.error('Error cargando favoritos', err))
        .finally(() => {setLoading(false)});
    
  }

  useEffect(() => {
    setLoading(true);
    api.get(`/favorites`)
      .then((res) => {
        const favoriteRecipes = res.data.map((favorite: { recipe: Recipe; }) => favorite.recipe);
        setRecipes(favoriteRecipes);
        setTotal(res.data.last_page);
        console.log("Mis favoritos", favoriteRecipes);
      })
      .catch(err => console.error('Error cargando favoritos', err))
      .finally(() => setLoading(false));
  }, []);


  return (
    <>
      <BasicPagination handlePage={getRecipes} total={total} />
    {loading ? (
      <>
      <LinearProgress sx={{marginTop: '10px'}} color="secondary" />
      <LinearProgress color="secondary" /></>
    ) : (
      <>
        <div className='recipes-grid'>
          <RecipeCard recipes={recipes} />
        </div>
      </>
    )}
  </>
  )
}

export default Favorites