import { useState } from 'react';
import { api } from '../api'; // tu Axios configurado

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
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <input type="password" name="password_confirmation" placeholder="Confirmar contraseña" onChange={handleChange} />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
