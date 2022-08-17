import { Link, useNavigate, Outlet } from "react-router-dom"
import axiosInstance from "./Axios";

const Navbar = () => {
  let navigate = useNavigate();
  const logout = () => {
    axiosInstance
    .post('/logout/', {refresh_token: localStorage.getItem('refresh_token')})
    .then((res) => {
      if(res.status >= 200 && res.status < 300){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        navigate('/login/');
        return
      }
      throw new Error('Something went wrong');
    })
    .catch(err => console.log(err))
  }
  return (
    <nav>
      <div className="nav-placeholder"></div>
      <div className="logo"><Link to='/'>Note Taking App</Link></div>
      <div className="nav-links">
        <ul>
          <li>
            <div className="pointer" onClick={logout}>Logout</div>
          </li>
        </ul>
      </div>
      <Outlet/>
    </nav>
  )
}

export default Navbar