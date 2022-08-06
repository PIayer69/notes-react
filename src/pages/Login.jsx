import './Login-Register.css';

const Login = () => {
  return (
    <div className='form-container'>
        <div className="title">Login</div>
        <form action="">
            <input type="text" placeholder='Username' />
            <input type="password" placeholder='Password' />
            <input type="submit" value='Login' />
        </form>
    </div>
  )
}

export default Login