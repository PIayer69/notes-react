import { useState } from 'react';

import './assets/Login-Register.css';

const Register = ({onSubmit}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  return (
    <div className='form-container'>
        <div className="title">Register</div>
        <form onSubmit={(e) => onSubmit(e, username, email, password, password1)}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder='Password Again' />
            <input type="submit" value='Register' />
        </form>
    </div>
  )
}

export default Register