import { useState } from 'react';

import './assets/Login-Register.css';

const Login = ({onSubmit}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='form-container'>
        <div className="title">Login</div>
        <form action="" onSubmit={(e) => onSubmit(e, username, password)}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <input type="submit" value='Login' />
        </form>
    </div>
  )
}

export default Login