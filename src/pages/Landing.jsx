import { useState } from 'react';

import './assets/Landing.css';
import Login from './Login';
import Register from './Register';

const Landing = ({api_url}) => {
  const [ loginForm, setLoginForm ] = useState(true)
  const token_obtain_api_url = api_url + 'token/';
  const token_refresh_api_url = api_url + 'token/refresh/';
  const login = (username, password) => {
    fetch(token_obtain_api_url)
  }

  return (
    // <div className="container">
      <div className='landing-container'>
        <div className='landing-left'>Simple note taking app...</div>
        <div className="landing-right">
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
    // </div>
  )
}

export default Landing