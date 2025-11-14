import { useNavigate } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Travel Agent H</h3>
          <p>Your trusted travel partner</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/booking">Booking</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Tools</h4>
          <ul>
            <li>
              <button 
                onClick={() => navigate('/holiday-planner')} 
                className="footer-planner-link"
              >
                🗓️ Holiday Planner
              </button>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@travelagenth.com</p>
          <p>Phone: +33 1 23 45 67 89</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Travel Agent H. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
