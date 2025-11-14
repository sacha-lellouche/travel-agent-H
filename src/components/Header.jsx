import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import '../styles/Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Travel Agent H</h1>
        </Link>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
