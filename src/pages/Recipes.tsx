import { useEffect, useState } from 'react';

type Recipe = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // 🔁 Cargar datos falsos al montar el componente
  useEffect(() => {
    const mockData: Recipe[] = [
      {
        id: 1,
        title: 'Paella Valenciana',
        description: 'Arroz con conejo, pollo y verduras frescas',
        image: 'https://via.placeholder.com/300x200?text=Paella'
      },
      {
        id: 2,
        title: 'Gazpacho Andaluz',
        description: 'Sopa fría de tomate, pimiento y pepino',
        image: 'https://via.placeholder.com/300x200?text=Gazpacho'
      }
    ];
    setRecipes(mockData);
  }, []);

  return (
    <div>
      <h2>Recetas Públicas</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {recipes.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '10px', width: '300px' }}>
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%' }} />
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <a href={`/recipe/${recipe.id}`}>Ver más</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
