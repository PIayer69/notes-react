import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './assets/Login-Register.css';
import axiosInstance from '../Axios';

const Register = ({api_url}) => {
  const register_api_url = api_url + 'register/';
  const initialFormData = Object.freeze({
    'username': '',
    'email': '',
    'password': '',
    'password1': ''
  })

  const [formData, setFormData] = useState(initialFormData)

  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const register = (e, formData) => {
    e.preventDefault();
    axiosInstance
    .post(register_api_url, formData)
    .then(res => res.data)
    .then(json => console.log(json))
    .then(() => navigate('/login/'));
  };

  return (
    <div className='form-container'>
        <div className="title">Register</div>
        <form onSubmit={(e) => register(e, formData)}>
            <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder='Username' />
            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email' />
            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password' />
            <input type="password" name='password1' value={formData.password1} onChange={handleChange} placeholder='Password Again' />
            <input type="submit" value='Register' />
        </form>
    </div>
  )
}

export default Register