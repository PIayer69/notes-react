import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/Login-Register.css';
import axiosInstance from '../../Axios';
import SubmitButton from './SubmitButton';

const Register = ({setErrorMessage}) => {
  const initialFormData = Object.freeze({
    'username': '',
    'email': '',
    'password': '',
    'password1': ''
  })

  const [formData, setFormData] = useState(initialFormData)
  const [buttonClicked, setButtonClicked] = useState(false);

  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const register = (e, formData) => {
    setErrorMessage('');
    e.preventDefault();
    setButtonClicked((prev) => !prev);
    axiosInstance
    .post('register/', formData)
    .then(res => res.data)
    .then(json => console.log(json))
    .then(() => navigate('/login/'))
    .catch(err => {
      setErrorMessage(err.response.data['Error'])
    })
    .finally(() => setButtonClicked((prev) => !prev));
  };

  return (
    <div className='form-container'>
        <div className="title">Register</div>
        <form>
            <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder='Username' />
            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email' />
            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password' />
            <input type="password" name='password1' value={formData.password1} onChange={handleChange} placeholder='Password Again' />
            <SubmitButton value={['Register', 'Registering...']} disabled={buttonClicked} onClick={(e) => register(e, formData)} />
        </form>
    </div>
  )
}

export default Register