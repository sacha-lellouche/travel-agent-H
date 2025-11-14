import { useState } from 'react'
import '../styles/Booking.css'

function Booking() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Réservation soumise:', formData)
    alert('Merci pour votre demande de réservation ! Nous vous contactons sous peu.')
  }

  return (
    <div className="booking">
      <div className="booking-header">
        <h1>Réservez votre voyage</h1>
        <p>Remplissez le formulaire ci-dessous pour réserver votre prochain voyage</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Détails du voyage</h2>
          
          <div className="form-group">
            <label htmlFor="destination">Destination *</label>
            <select
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une destination</option>
              <option value="paris">Paris, France</option>
              <option value="tokyo">Tokyo, Japon</option>
              <option value="newyork">New York, USA</option>
              <option value="rome">Rome, Italie</option>
              <option value="bali">Bali, Indonésie</option>
              <option value="barcelona">Barcelone, Espagne</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Date de départ *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Date de retour *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="travelers">Nombre de voyageurs *</label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              min="1"
              max="10"
              value={formData.travelers}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Vos informations</h2>
          
          <div className="form-group">
            <label htmlFor="name">Nom complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Téléphone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message ou demandes spéciales</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Dites-nous vos préférences ou besoins particuliers..."
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Envoyer ma demande de réservation
        </button>
      </form>
    </div>
  )
}

export default Booking
