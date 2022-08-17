import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

import './assets/Login-Register.css';
import SubmitButton from './components/SubmitButton';

const Login = ({setErrorMessage}) => {
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
    setErrorMessage('');
    e.preventDefault();
    axiosInstance
    .post('token/', formData)
    .then(res => {
      console.log(res.status)
      if(res.status >= 200 && res.status < 300){
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        navigate('/');
        return
      }
      throw new Error();
    }).catch(err => {
      if(err.response.status){
        setErrorMessage('Username or password incorrect')
      }
    })
  }

  return (
    <div className='form-container'>
        <div className="title">Login</div>
        <form onSubmit={(e) => login(e, formData)}>
            <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder='Username' />
            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password' />
            <SubmitButton value='Login' />
        </form>
    </div>
  )
}

export default Login