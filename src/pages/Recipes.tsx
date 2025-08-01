import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { api } from '../api';
import BasicPagination from '../components/Pagination';
import './css/mrecipes.css';
import LinearProgress from '@mui/material/LinearProgress';


const Recipes = () => {

  const [total, setTotal] = useState<number>(10);
  const [loading, setLoading] = useState(true);

  const getRecipes = (page: number) => {
    setLoading(true);
    console.log("Pasando a la pagina", page);
    api.get(`/recipes?page=${page}`)
        .then((res) => {
          setRecipes(res.data.data);
          console.log("Esto es res", res.data);
        }
        )
        .catch(err => console.error('Error cargando recetas', err))
        .finally(() => {setLoading(false)});
    
  }

  const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      setLoading(true);
      api.get('/recipes')
        .then((res) => {
          setRecipes(res.data.data)
          setTotal(res.data.last_page);
          console.log("Esto es res", res.data);
        }
        )
        .catch(err => console.error('Error cargando recetas', err))
        .finally(() => {setLoading(false)});
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
  );
};

export default Recipes;
