import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>No estás logueado</p>;
  }

  return (
    <div>
      <h2>Hola, {user.name}</h2>
      <p>Correo: {user.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
