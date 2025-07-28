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
type Props = {
    recipes?: Recipe[];
}

function RecipeCard({ recipes }: Props) {

    const { user } = useAuth();

    return (
        <>
            {recipes?.map((recipe) => (
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: blue[900] }} aria-label="recipe">
                                {user?.name.charAt(0).toUpperCase() || '?'}
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
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </>
    )
}

export default RecipeCard