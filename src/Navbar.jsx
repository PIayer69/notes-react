import { Link, useNavigate, Outlet } from "react-router-dom"

const Navbar = () => {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login/');
  }
  return (
    <nav>
      <div></div>
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