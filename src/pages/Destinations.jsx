import { useState } from 'react'
import Card from '../components/Card'
import '../styles/Destinations.css'

function Destinations() {
  const [filter, setFilter] = useState('all')

  const destinations = [
    { id: 1, title: 'Paris, France', category: 'europe', description: 'La ville lumière', image: '/images/paris.jpg', price: '599€' },
    { id: 2, title: 'Tokyo, Japon', category: 'asia', description: 'Culture japonaise', image: '/images/tokyo.jpg', price: '1299€' },
    { id: 3, title: 'New York, USA', category: 'america', description: 'La grosse pomme', image: '/images/newyork.jpg', price: '899€' },
    { id: 4, title: 'Rome, Italie', category: 'europe', description: 'Histoire et gastronomie', image: '/images/rome.jpg', price: '549€' },
    { id: 5, title: 'Bali, Indonésie', category: 'asia', description: 'Paradis tropical', image: '/images/bali.jpg', price: '799€' },
    { id: 6, title: 'Barcelone, Espagne', category: 'europe', description: 'Art et architecture', image: '/images/barcelona.jpg', price: '499€' },
  ]

  const filteredDestinations = filter === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === filter)

  return (
    <div className="destinations">
      <div className="destinations-header">
        <h1>Nos Destinations</h1>
        <p>Explorez le monde avec Travel Agent H</p>
      </div>

      <div className="filters">
        <button 
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          Toutes
        </button>
        <button 
          className={filter === 'europe' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('europe')}
        >
          Europe
        </button>
        <button 
          className={filter === 'asia' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('asia')}
        >
          Asie
        </button>
        <button 
          className={filter === 'america' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('america')}
        >
          Amérique
        </button>
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map(dest => (
          <div key={dest.id} className="destination-card">
            <Card
              title={dest.title}
              description={dest.description}
              image={dest.image}
            />
            <div className="destination-footer">
              <span className="price">À partir de {dest.price}</span>
              <a href="/booking" className="book-btn">Réserver</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Destinations
