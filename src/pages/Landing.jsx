import { useState } from 'react';

import './assets/Landing.css';
import Login from './Login';
import Register from './Register';

const Landing = () => {
  const [ loginForm, setLoginForm ] = useState(true)
  return (
    <div className="container">
      <div className='landing-container'>
        <div>Simple note taking app...</div>
        {
        loginForm ? 
        <>
          <Login />
          <div className='switch-form'>Don't have an account yet? <span onClick={() => setLoginForm(!loginForm)}>Register</span></div>
        </>
        :
        <>
          <Register />
          <div className='switch-form'>Already have an account? <span onClick={() => setLoginForm(!loginForm)}>Login</span></div>
        </>
        }
        
      </div>
    </div>
  )
}

export default Landing