import { useNavigate } from 'react-router-dom';

import './assets/Landing.css';
import Login from './Login';
import Register from './Register';

const Landing = ({api_url, page}) => {
  let navigate = useNavigate();

  return (
    <div className='landing-container'>
      <div className='landing-left'>Simple note taking app...</div>
      <div className="landing-right">
        {
        page === 'login' ? 
        <>
          <Login api_url={api_url} />
          <div className='switch-form'>Don't have an account yet? <span onClick={() => navigate('/register/')}>Register</span></div>
        </>
        :
        <>
          <Register api_url={api_url}/>
          <div className='switch-form'>Already have an account? <span onClick={() => navigate('/login/')}>Login</span></div>
        </>
        }
      </div>
    </div>
  )
}

export default Landing