import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './assets/Landing.css';
import Login from './components/Login';
import Register from './components/Register';

const Landing = ({page}) => {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className='landing-container'>
      <div className='landing-left'>Simple note taking app...</div>
      <div className="landing-right">
        {
        page === 'login' ? 
        <>
          <Login setErrorMessage={setErrorMessage} />
          <div className="form-error">{errorMessage}</div>
          <div className='switch-form'>Don't have an account yet? <span onClick={() => { navigate('/register/'); setErrorMessage('');}}>Register</span></div>
        </>
        :
        <>
          <Register setErrorMessage={setErrorMessage} />
          <div className="form-error">{errorMessage}</div>
          <div className='switch-form'>Already have an account? <span onClick={() => { navigate('/login/'); setErrorMessage('');}}>Login</span></div>
        </>
        }
      </div>
    </div>
  )
}

export default Landing