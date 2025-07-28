import { useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await login(form.email, form.password);
    alert('Inicio de sesión exitoso');
    navigate('/profile');
  } catch (err: any) {
    alert('Credenciales inválidas');
    console.error(err.response?.data || err.message);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
