import { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './css/cRecipe.css';

type Category = {
  id: number;
  name: string;
};

type Ingredient = {
  id: number;
  name: string;
};

const CreateRecipe = () => {

  const [ingredient, setIngredient] = useState('');
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { user, token } = useAuth();

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error cargando categorías', err));
  }, []);

  useEffect(() => {
    api.get('/ingredients')
      .then(res => setIngredients(res.data))
      .catch(err => console.error('Error cargando categorías', err));
  }, []);

  useEffect(() => {
    console.log(categories, ingredients);
  });


  // Actualiza el estado `ingredient` cuando escribimos en el input
  const changeInName = (e: any) => {
    setIngredient(e.target.value); // Guarda el valor del input en el estado
  };

  // Actualiza el estado `category` cuando escribimos en el input
  const changeCaName = (e: any) => {
    setCategory(e.target.value); // Guarda el valor del input en el estado
  };

  const changeTitle = (e: any) => {
    setTitle(e.target.value); // Guarda el valor del input en el estado
  };

  const changeDescription = (e: any) => {
    setDescription(e.target.value); // Guarda el valor del input en el estado
  };

  const changeCategory = (e: any) => {
    setCategoryId(e.target.value); // Guarda el valor del input en el estado
  };

  const submitIngredient = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    try {
      // Hacemos POST a /ingredients con el nombre del ingrediente
      const response = await api.post('/ingredients', { name: ingredient });

      console.log('Ingrediente creado:', response.data);

      // Actualizamos la lista de ingredientes (hacemos GET de nuevo)
      const res = await api.get('/ingredients');
      setIngredients(res.data);

      // Limpiamos el input
      setIngredient('');
    } catch (err) {
      console.error('Error creando ingrediente', err);
    }
  };

  const submitCategory = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    try {
      // Hacemos POST a /categories con el nombre de la categoría
      const response = await api.post('/categories', { name: category });

      console.log('Categoría creada:', response.data);

      // Actualizamos la lista de categorías (hacemos GET de nuevo)
      const res = await api.get('/categories');
      setCategories(res.data);

      // Limpiamos el input
      setCategory('');
    } catch (err) {
      console.error('Error creando categoría', err);
    }
  };

  const submitRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        user_id: user?.id,
        category_id: parseInt(categoryId),
        description
      };
      console.log("Creando receta con la info", payload);

      const res = await api.post('/recipes', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const newRecipeId = res.data.data.id;
      alert('Receta creada correctamente 🧑‍🍳');

      // Aquí podrías redirigir o continuar creando pasos/ingredientes
      console.log('ID de nueva receta:', newRecipeId);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert('Error al crear receta');
    }
  };


  return (
    <div className='main-container'>

      <section className='form'>
      <form onSubmit={submitIngredient}>
        <h2>Crear Ingrediente</h2>
        <TextField id="outlined-basic" onChange={changeInName} label="Nombre ingrediente" variant="outlined" />
        <Button type='submit' variant="contained">Crear</Button>
      </form>

      <form onSubmit={submitCategory}>
      <h2>Crear Categoría</h2>
        <TextField id="outlined-basic" onChange={changeCaName} label="Nombre categoría" variant="outlined" />
        <Button type='submit' variant="contained">Crear</Button>
      </form>
      </section>

     <section className='form'>
       <h2>Crear Receta</h2>
      <form onSubmit={submitRecipe}>
        <TextField id="outlined-basic" onChange={changeTitle} label="Título" variant="outlined" />

        <TextField id="outlined-basic" onChange={changeDescription} label="Descripción" variant="outlined" />

        <InputLabel id="demo-simple-select-label">Selecciona una categoría</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={changeCategory}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
        <Button type='submit' variant="contained">Crear</Button>
      </form>
     </section>

    </div>
  );

}
export default CreateRecipe;
