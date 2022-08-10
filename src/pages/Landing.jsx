import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './assets/Landing.css';
import Login from './Login';
import Register from './Register';

const Landing = ({api_url, page}) => {
  // const [ loginForm, setLoginForm ] = useState(true)
  const token_obtain_api_url = api_url + 'token/';
  const token_refresh_api_url = api_url + 'token/refresh/';
  let navigate = useNavigate();

  const login = (e, username, password) => {
    e.preventDefault();
    fetch(token_obtain_api_url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    }).then(res => {
      console.log(res.status)
      if(res.status >= 200 && res.status < 300){
        return res.json()
      }
      throw new Error();
    }).then(tokens => {
      console.log(tokens)
      localStorage.setItem('access_token', tokens['access']);
      localStorage.setItem('refresh_token', tokens['refresh']);
      navigate('/')
    }).catch(err => console.log('Fetch failed'))
  }

  const register = (e, username, email, password, password1) => {
    const register_api_url = api_url + 'register/'
    e.preventDefault();
    fetch(register_api_url, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "username": username,
          "email": email,
          "password": password,
          "password1": password1
        })
    }).then(res => res.json())
    .then(json => console.log(json))
    .then(() => navigate('/login/'));
  };

  return (
    <div className='landing-container'>
      <div className='landing-left'>Simple note taking app...</div>
      <div className="landing-right">
        {
        page === 'login' ? 
        <>
          <Login onSubmit={login} />
          <div className='switch-form'>Don't have an account yet? <span onClick={() => navigate('/register/')}>Register</span></div>
        </>
        :
        <>
          <Register onSubmit={register}/>
          <div className='switch-form'>Already have an account? <span onClick={() => navigate('/login/')}>Login</span></div>
        </>
        }
      </div>
    </div>
  )
}

export default Landing