import './assets/Login-Register.css';

const Register = () => {
  return (
    <div className='form-container'>
        <div className="title">Register</div>
        <form action="">
            <input type="text" placeholder='Username' />
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <input type="password" placeholder='Password Again' />
            <input type="submit" value='Register' />
        </form>
    </div>
  )
}

export default Register