import { NavLink } from 'react-router-dom'
import '../styles/Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/destinations" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Destinations
          </NavLink>
        </li>
        <li>
          <NavLink to="/booking" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Réservation
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            À propos
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
