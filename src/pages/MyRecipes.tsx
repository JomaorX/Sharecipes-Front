import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { api } from '../api';
import './css/mrecipes.css'
import LinearProgress from '@mui/material/LinearProgress';
import BasicPagination from '../components/Pagination';

type Props = {}

function MyRecipes({}: Props) {
  const [total, setTotal] = useState<number>(10);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); 

  const getRecipes = (page: number) => {
      setLoading(true);
      console.log("Pasando a la pagina", page);
      api.get(`/favorites?page=${page}`)
          .then((res) => {
            setRecipes(res.data.data);
            console.log("Esto es res", res.data);
          }
          )
          .catch(err => console.error('Error cargando favoritos', err))
          .finally(() => {setLoading(false)});
      
    }

  useEffect(() => {
    api.get('/myrecipes')
      .then((res) => {
        setRecipes(res.data.data);
        setTotal(res.data.last_page);
      })
      .catch(err => console.error('Error cargando categorías', err));
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

export default MyRecipes