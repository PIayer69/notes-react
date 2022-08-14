import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

import './assets/Login-Register.css';

const Login = ({api_url}) => {
  const token_obtain_api_url = api_url + 'token/'; 
  const initialFormData = Object.freeze({
    'username': '',
    'password': ''
  })
  const [formData, setFormData] = useState(initialFormData);

  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const login = (e, formData) => {
    e.preventDefault();
    axiosInstance
    .post(token_obtain_api_url, formData)
    .then(res => {
      console.log(res.status)
      if(res.status >= 200 && res.status < 300){
        return res.data
      }
      throw new Error();
    }).then(tokens => {
      console.log(tokens)
      localStorage.setItem('access_token', tokens['access']);
      localStorage.setItem('refresh_token', tokens['refresh']);
      navigate('/')
    }).catch(err => console.log('Fetch failed'))
  }

  return (
    <div className='form-container'>
        <div className="title">Login</div>
        <form onSubmit={(e) => login(e, formData)}>
            <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder='Username' />
            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password' />
            <input type="submit" value='Login' />
        </form>
    </div>
  )
}

export default Login