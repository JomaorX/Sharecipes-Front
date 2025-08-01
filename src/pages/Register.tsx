import { useState } from 'react';
import { api } from '../api'; // tu Axios configurado
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Register = () => {
  // 🧠 Guardamos los valores del formulario en el estado
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // 🎯 Actualiza el estado cada vez que se escribe en un input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🚀 Enviar el formulario al backend Laravel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita que se recargue la página

    try {
      const res = await api.post('/register', form);
      alert('Registro exitoso');
      console.log(res.data); // puedes ver la respuesta en consola
    } catch (err: any) {
      alert('Error al registrar');
      console.error(err.response?.data || err.message);
    }
  };

  // 🧩 El formulario visual
  return (
    <div className="auth-container">
      <section className="auth-form">
        <form onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <TextField id="outlined-basic" onChange={handleChange} label="Nombre" variant="outlined" />
          <TextField id="outlined-basic" onChange={handleChange} label="Email" variant="outlined" />
          <TextField id="outlined-basic" onChange={handleChange} label="Contraseña" variant="outlined" />
          <TextField id="outlined-basic" onChange={handleChange} label="Confirmar contraseña" variant="outlined" />
          <Button type='submit' variant="contained">Registrarse</Button>
          <div className='info'>
            <Alert severity="info">
              ¿Tienes una cuenta?
              <AlertTitle><Link to="/login"><strong>Entrar</strong></Link></AlertTitle>
            </Alert>

          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
