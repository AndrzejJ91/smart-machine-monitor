

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './utlis/axios.Config';



const LogIn = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        
      try {
        const response = await api.post('http://localhost:3000/api/login', {email, password})
              const token = response.data.token
              await localStorage.setItem('token', token)
              navigate('/dashboard');
      }catch(error) {
        alert('Nieprawidłowy login lub hasło');

      }
      
      
      
      
    }

  return (
    <div className='w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center'>
      <div className='w-96 bg-white rounded-xl shadow-xl p-8 flex flex-col items-center'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Log In</h1>
        <div className='flex flex-col gap-4 w-full'>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder='Email'
            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
          />
          <input
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            name='password'
            placeholder='Password'
            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
          />
        </div>
        <button 
        onClick={handleLogin}
        className='mt-6 w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition duration-300 cursor-pointer'>
          Submit
        </button>
      </div>
    </div>
  );
}

export default LogIn;
