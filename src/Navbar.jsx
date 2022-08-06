import { Link, Outlet } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <div></div>
      <div className="logo"><Link to='/'>Note Taking App</Link></div>
      <div className="nav-links">
        <ul>
          <li>
            <Link to='home/'>Home</Link>
          </li>
          <li>
            <Link to='login/'>Login</Link>
          </li>
          <li>
            <Link to='register/'>Register</Link>
          </li>
        </ul>
      </div>
      <Outlet/>
    </nav>
  )
}

export default Navbar