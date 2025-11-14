import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Travel Agent H</h3>
          <p>Votre partenaire voyage de confiance</p>
        </div>
        
        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/booking">Réservation</a></li>
            <li><a href="/about">À propos</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@travelagenth.com</p>
          <p>Tél: +33 1 23 45 67 89</p>
        </div>
        
        <div className="footer-section">
          <h4>Suivez-nous</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Travel Agent H. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer
