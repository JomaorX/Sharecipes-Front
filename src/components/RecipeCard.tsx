import type { Recipe } from '../types/Recipe'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDate } from '../utils/formatDate';
import { useAuth } from '../context/AuthContext';
import Button from '@mui/material/Button';
import { api } from '../api';
import { useEffect, useState } from 'react';
type Props = {
    recipes?: Recipe[];
}

function RecipeCard({ recipes }: Props) {

    const { user } = useAuth();

    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        if (user) {
            api.get('/favorites')
                .then(res => {
                    const favoriteIds = res.data.map((fav: any) => fav.recipeId);
                    setFavorites(favoriteIds);
                })
                .catch(err => console.error('Error cargando favoritos', err));
        }
    }, [user]); // Dependencia de user

    const handleFavorite = async (recipeId: number) => {
        if (!user) {
            alert("Inicia sesión para agregar a tus favoritos");
            return;
        }

        try {
            console.log("Agregando la receta", recipeId);
            const response = await api.post('/favorites', { recipe_id: recipeId });
            
            // Actualiza el estado local
            setFavorites(prev => {
                if (prev.includes(recipeId)) {
                    return prev.filter(id => id !== recipeId);
                } else {
                    return [...prev, recipeId];
                }
            });

            if (response.status === 200) {
                alert("Receta eliminada de favoritos");
            } else if (response.status === 201) {
                alert("Receta agregada a favoritos");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Ocurrió un error");
        }
    }


    return (
        <>
            {recipes?.map((recipe) => (
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: blue[900] }} aria-label="recipe">
                                {recipe?.user?.name.charAt(0).toUpperCase() || '?'}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={recipe?.title || "Shrimp and Chorizo Paella"}
                        subheader={recipe?.created_at ? formatDate(recipe.created_at) : "Fecha no disponible"}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={recipe?.recipeImages?.[0] || "https://blog.dia.es/wp-content/uploads/2022/02/PAELLA-VALENCIANA-1280x720.jpg"}
                        alt={recipe?.title || "Paella"}
                    />
                    <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {recipe?.description || "Paellita"}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                            <IconButton onClick={() => handleFavorite(recipe.id)}  aria-label="add to favorites">
                                <FavoriteIcon id="icoFav" color= {favorites.includes(recipe.id) ? 'primary' : 'inherit'}/>
                            </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        {(user?.id ==  recipe?.user?.id) && 
                        <Button variant="outlined" size="small">
                            Gestionar
                        </Button>}
                    </CardActions>
                    
                </Card>
            ))}
        </>
    )
}

export default RecipeCard