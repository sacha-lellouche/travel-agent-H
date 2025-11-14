import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import '../styles/QuizSummary.css'

function QuizSummary() {
  const location = useLocation()
  const navigate = useNavigate()
  const quizData = location.state?.quizData

  useEffect(() => {
    // If no data, redirect to home
    if (!quizData) {
      navigate('/')
    }
  }, [quizData, navigate])

  if (!quizData) {
    return null
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 'Not specified'
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return `${days} day${days > 1 ? 's' : ''}`
  }

  const formatList = (array) => {
    if (!array || array.length === 0) return 'None selected'
    return array.join(', ')
  }

  const getLabelForValue = (field, value) => {
    const labels = {
      travelWith: {
        solo: 'Solo',
        couple: 'As a couple',
        family: 'With family',
        friends: 'With friends'
      },
      budget: {
        budget: 'Budget / Economical',
        standard: 'Standard Comfort',
        boutique: 'Chic / Boutique & Local',
        premium: 'Premium / Luxury'
      },
      pace: {
        'very-chill': 'Very chill (1 activity max per day)',
        'calm-active': 'Calm but active (2-3 activities per day)',
        'active': 'Active (Full day schedule)',
        'flexible': 'Flexible (Depending on the mood)'
      },
      discovery: {
        'must-see': 'The must-sees (Iconic landmarks)',
        'local-gems': 'Local gems (Off the beaten path)',
        'balanced': 'A balanced mix (Best of both worlds)'
      },
      accommodation: {
        hotel: 'Hotel',
        boutique: 'Boutique Hotel',
        hostel: 'Hostel / Guesthouse',
        resort: 'Resort / All-inclusive',
        lodge: 'Lodge / Glamping',
        rental: 'Rental (Airbnb/apartment)'
      },
      transport: {
        walk: 'Walking',
        public: 'Public transport',
        car: 'Rental car',
        bike: 'Bike',
        guided: 'Guided tours'
      },
      mainTransport: {
        direct: 'Direct only',
        'one-stop': '1 stopover max',
        'dont-care': "I don't care",
        eco: 'Most eco-friendly option'
      }
    }
    return labels[field]?.[value] || value
  }

  const handleCopyData = () => {
    const formattedText = `
TRAVEL PREFERENCES SUMMARY
==========================

📍 DESTINATION & DATES
Destination: ${quizData.destination || 'Not specified'}
Travel Dates: ${formatDate(quizData.startDate)} - ${formatDate(quizData.endDate)}
Duration: ${calculateDuration(quizData.startDate, quizData.endDate)}

👥 TRAVELERS
Traveling: ${getLabelForValue('travelWith', quizData.travelWith)}
${quizData.groupSize ? `Group Size: ${quizData.groupSize} people` : ''}

💰 BUDGET & STYLE
Budget Range: ${getLabelForValue('budget', quizData.budget)}
Travel Pace: ${getLabelForValue('pace', quizData.pace)}
Discovery Style: ${getLabelForValue('discovery', quizData.discovery)}

🎯 ACTIVITIES (Priority order)
${quizData.activities.map((activity, index) => `${index + 1}. ${activity}`).join('\n')}

🏨 ACCOMMODATION
Type: ${getLabelForValue('accommodation', quizData.accommodation)}
Priorities: ${formatList(quizData.accommodationPriorities)}

🚗 TRANSPORTATION
Local Transport: ${getLabelForValue('transport', quizData.transport)}
Main Transport: ${getLabelForValue('mainTransport', quizData.mainTransport)}

🌿 ECOLOGY
Importance: ${quizData.ecology}/100

---
Generated: ${new Date(quizData.timestamp).toLocaleString()}
    `.trim()

    navigator.clipboard.writeText(formattedText)
    alert('✅ Travel preferences copied to clipboard!')
  }

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(quizData, null, 2))
    alert('✅ JSON data copied to clipboard!')
  }

  return (
    <div className="quiz-summary">
      <div className="quiz-logo" onClick={() => navigate('/')}>
        <h1>Travel Agent H</h1>
      </div>

      <div className="summary-container">
        <div className="summary-header">
          <h1>🎉 Your Travel Profile is Ready!</h1>
          <p>Here's a complete summary of your preferences. Our AI agent will use this to create your perfect itinerary.</p>
        </div>

        <div className="summary-content">
          <section className="summary-section">
            <h2>📍 Destination & Dates</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="item-label">Destination:</span>
                <span className="item-value">{quizData.destination || 'Not specified'}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Start Date:</span>
                <span className="item-value">{formatDate(quizData.startDate)}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">End Date:</span>
                <span className="item-value">{formatDate(quizData.endDate)}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Duration:</span>
                <span className="item-value">{calculateDuration(quizData.startDate, quizData.endDate)}</span>
              </div>
            </div>
          </section>

          <section className="summary-section">
            <h2>👥 Travelers</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="item-label">Traveling:</span>
                <span className="item-value">{getLabelForValue('travelWith', quizData.travelWith)}</span>
              </div>
              {quizData.groupSize && (
                <div className="summary-item">
                  <span className="item-label">Group Size:</span>
                  <span className="item-value">{quizData.groupSize} people</span>
                </div>
              )}
            </div>
          </section>

          <section className="summary-section">
            <h2>💰 Budget & Style</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="item-label">Budget Range:</span>
                <span className="item-value">{getLabelForValue('budget', quizData.budget)}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Travel Pace:</span>
                <span className="item-value">{getLabelForValue('pace', quizData.pace)}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Discovery Style:</span>
                <span className="item-value">{getLabelForValue('discovery', quizData.discovery)}</span>
              </div>
            </div>
          </section>

          <section className="summary-section">
            <h2>🎯 Favorite Activities</h2>
            <div className="activities-list">
              {quizData.activities && quizData.activities.length > 0 ? (
                <ol>
                  {quizData.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ol>
              ) : (
                <p>No activities selected</p>
              )}
            </div>
          </section>

          <section className="summary-section">
            <h2>🏨 Accommodation</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="item-label">Type:</span>
                <span className="item-value">{getLabelForValue('accommodation', quizData.accommodation)}</span>
              </div>
              <div className="summary-item full-width">
                <span className="item-label">Priorities:</span>
                <span className="item-value">{formatList(quizData.accommodationPriorities)}</span>
              </div>
            </div>
          </section>

          <section className="summary-section">
            <h2>🚗 Transportation</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="item-label">Local Transport:</span>
                <span className="item-value">{getLabelForValue('transport', quizData.transport)}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Main Transport:</span>
                <span className="item-value">{getLabelForValue('mainTransport', quizData.mainTransport)}</span>
              </div>
            </div>
          </section>

          <section className="summary-section">
            <h2>🌿 Ecology</h2>
            <div className="ecology-bar">
              <div className="ecology-fill" style={{ width: `${quizData.ecology}%` }}>
                <span>{quizData.ecology}%</span>
              </div>
            </div>
            <p className="ecology-label">
              {quizData.ecology < 25 && '⚪ Not much'}
              {quizData.ecology >= 25 && quizData.ecology < 50 && '🟢 Moderately important'}
              {quizData.ecology >= 50 && quizData.ecology < 75 && '🌿 Important'}
              {quizData.ecology >= 75 && '🍃 Top priority'}
            </p>
          </section>

          <section className="summary-section json-section">
            <h2>📋 Raw Data (for AI Agent)</h2>
            <pre className="json-display" id="jsonData">
              {JSON.stringify(quizData, null, 2)}
            </pre>
          </section>
        </div>

        <div className="summary-actions">
          <button className="btn-secondary" onClick={handleCopyData}>
            📋 Copy Summary
          </button>
          <button className="btn-secondary" onClick={handleCopyJSON}>
            💾 Copy JSON
          </button>
          <button className="btn-primary" onClick={() => navigate('/holiday-planner')}>
            ✨ Get My Itinerary
          </button>
        </div>

        <p className="summary-footer">
          Generated on {new Date(quizData.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default QuizSummary
