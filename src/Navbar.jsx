import { Link, Outlet } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <div></div>
      <div className="logo"><Link to='/'>Note Taking App</Link></div>
      <div className="nav-links">
        <ul>
          <li>
            <Link to='logout/'>Logout</Link>
          </li>
        </ul>
      </div>
      <Outlet/>
    </nav>
  )
}

export default Navbar