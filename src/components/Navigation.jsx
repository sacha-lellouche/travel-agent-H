import { NavLink } from 'react-router-dom'
import '../styles/Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/destinations" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Destinations
          </NavLink>
        </li>
        <li>
          <NavLink to="/booking" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Booking
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
