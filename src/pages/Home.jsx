import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate()

  const destinations = [
    {
      name: 'Venise, Italie',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
      description: 'Canaux romantiques et architecture vénitienne'
    },
    {
      name: 'Cappadoce, Turquie',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
      description: 'Montgolfières au lever du soleil'
    },
    {
      name: 'Santorini, Grèce',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
      description: 'Villages blancs et couchers de soleil magiques'
    },
    {
      name: 'Bali, Indonésie',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      description: 'Temples sacrés et rizières en terrasses'
    },
    {
      name: 'Kyoto, Japon',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      description: 'Temples zen et jardins traditionnels'
    },
    {
      name: 'Machu Picchu, Pérou',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
      description: 'Cité inca perchée dans les montagnes'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section with CTA Cards */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Où souhaitez-vous voyager ?</h1>
          <p className="hero-subtitle">Laissez-nous créer votre voyage parfait</p>
          
          <div className="cta-cards">
            <div className="cta-card" onClick={() => navigate('/destinations')}>
              <div className="cta-icon">🌍</div>
              <h3>Je sais où je veux aller</h3>
              <p>Explorez nos destinations et trouvez le voyage parfait pour vous. Comparez les prix, les activités et réservez en toute simplicité.</p>
              <span className="cta-arrow">Découvrir les destinations →</span>
            </div>
            
            <div className="cta-card" onClick={() => navigate('/booking')}>
              <div className="cta-icon">✨</div>
              <h3>J'ai besoin d'inspiration</h3>
              <p>Notre équipe d'experts vous aidera à créer un voyage sur mesure basé sur vos envies, votre budget et vos dates de disponibilité.</p>
              <span className="cta-arrow">Planifier mon voyage →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="destinations-showcase">
        <h2 className="section-title">Destinations qui inspirent</h2>
        <p className="section-subtitle">Découvrez les plus beaux endroits du monde</p>
        
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <div key={index} className="destination-card" onClick={() => navigate('/destinations')}>
              <div className="destination-image">
                <img src={destination.image} alt={destination.name} />
                <div className="destination-overlay">
                  <div className="destination-info">
                    <h3>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <span className="explore-btn">Explorer →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-content">
          <h2>Pourquoi voyager avec nous ?</h2>
          <div className="trust-features">
            <div className="trust-feature">
              <div className="trust-icon">⭐</div>
              <h4>Expertise locale</h4>
              <p>Des conseillers passionnés qui connaissent chaque destination</p>
            </div>
            <div className="trust-feature">
              <div className="trust-icon">💎</div>
              <h4>Voyages sur mesure</h4>
              <p>Chaque itinéraire est unique et personnalisé</p>
            </div>
            <div className="trust-feature">
              <div className="trust-icon">🛡️</div>
              <h4>Sérénité garantie</h4>
              <p>Support 24/7 et assistance pendant votre voyage</p>
            </div>
            <div className="trust-feature">
              <div className="trust-icon">💰</div>
              <h4>Meilleur rapport qualité-prix</h4>
              <p>Des tarifs négociés avec nos partenaires de confiance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
