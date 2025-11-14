import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate()

  const destinations = [
    {
      name: 'Venice, Italy',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
      description: 'Romantic canals and Venetian architecture'
    },
    {
      name: 'Cappadocia, Turkey',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
      description: 'Hot air balloons at sunrise'
    },
    {
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
      description: 'White villages and magical sunsets'
    },
    {
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      description: 'Sacred temples and terraced rice fields'
    },
    {
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      description: 'Zen temples and traditional gardens'
    },
    {
      name: 'Machu Picchu, Peru',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
      description: 'Ancient Inca city in the mountains'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section with CTA Cards */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Where do you want to travel?</h1>
          <p className="hero-subtitle">Let us create your perfect journey</p>
          
          <div className="cta-cards">
            <div className="cta-card" onClick={() => navigate('/quiz')}>
              <h3>I know where I want to go</h3>
              <p>Explore our destinations and find the perfect trip for you. Compare prices, activities, and book with ease.</p>
              <span className="cta-arrow">Discover destinations →</span>
            </div>
            
            <div className="cta-card" onClick={() => navigate('/inspiration')}>
              <h3>I need inspiration</h3>
              <p>Our team of experts will help you create a tailor-made trip based on your desires, budget, and availability.</p>
              <span className="cta-arrow">Plan my trip →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="destinations-showcase">
        <h2 className="section-title">Inspiring Destinations</h2>
        <p className="section-subtitle">Discover the most beautiful places in the world</p>
        
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <div key={index} className="destination-card" onClick={() => navigate('/destinations')}>
              <div className="destination-image">
                <img src={destination.image} alt={destination.name} />
                <div className="destination-overlay">
                  <div className="destination-info">
                    <h3>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <span className="explore-btn">Explore →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
