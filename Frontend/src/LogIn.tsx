
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    }

  return (
    <div className='w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center'>
      <div className='w-96 bg-white rounded-xl shadow-xl p-8 flex flex-col items-center'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Log In</h1>
        <div className='flex flex-col gap-4 w-full'>
          <input
            type="email"
            name="email"
            placeholder='Email'
            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
          />
          <input
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
