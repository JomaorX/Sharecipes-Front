import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link> |{' '}
      {!user && <Link to="/login">Login</Link>} |{' '}
      {!user && <Link to="/register">Registro</Link>} |{' '}
      {!user && <Link to="/recipes">Recetas</Link>}
      {user && <Link to="/profile">Perfil</Link>} 
      {user && <Link to="/favorites">Favoritos</Link>}
      {user && <Link to="/recipes/create">Crear Receta</Link>}
      {user && <Link to="/my-recipes">Mis Recetas</Link>}
    </nav>
  );
};

export default Navbar;

