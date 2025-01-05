import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 

const LoginPage = () => {
  const { login, signUp, loading, error } = useAuth(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as 'student' | 'teacher',
  });
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate(); 

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', role: 'student' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, role } = formData;

    if (isLogin) {
      await login(email, password);
    } else {
      await signUp(email, password, role); 
    }

    // Redireccionar según el rol después de la autenticación
    if (role === 'teacher') {
      navigate('/teacher-page'); // Redirigir a la página de profesor
    } else {
      navigate('/student-page'); // Redirigir a la página de estudiante
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Selecciona tu rol</label>
              <select
                id="role"
                name="role"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="student">Estudiante</option>
                <option value="teacher">Profesor</option>
              </select>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={handleSwitch}
          >
            {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
