import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './css/auth.css';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import AlertTitle from '@mui/material/AlertTitle';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

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
    setError(err.response?.data?.message || 'Credenciales inválidas');
    console.error(err.response?.data || err.message);
  }
};

  return (
    <div className="auth-container">
      <section className="auth-form">
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
          <TextField id="outlined-basic" onChange={handleChange} name="email" label="Email" variant="outlined" />
          <TextField id="outlined-basic" type='password' onChange={handleChange} name="password" label="Contraseña" variant="outlined" />
          <Button type='submit' variant="contained">Entrar</Button>
              <div className='info'>
                <Alert severity="info">
                ¿No tienes una cuenta?
                <AlertTitle><Link to="/register"><strong>Registrate</strong></Link></AlertTitle> 
              </Alert>
              </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
