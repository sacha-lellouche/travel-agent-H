import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Quiz.css'

function Quiz() {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState(0)
  const [answers, setAnswers] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelWith: '',
    groupSize: '',
    budget: '',
    activities: [],
    pace: '',
    discovery: '',
    accommodation: '',
    accommodationPriorities: [],
    transport: '',
    mainTransport: '',
    ecology: 25
  })

  // Log quiz data to console whenever answers change
  useEffect(() => {
    const formattedData = {
      destination: answers.destination,
      startDate: answers.startDate,
      endDate: answers.endDate,
      travelWith: answers.travelWith,
      groupSize: answers.groupSize || null,
      budget: answers.budget,
      activities: answers.activities,
      pace: answers.pace,
      discovery: answers.discovery,
      accommodation: answers.accommodation,
      accommodationPriorities: answers.accommodationPriorities,
      transport: answers.transport,
      mainTransport: answers.mainTransport,
      ecology: answers.ecology,
      timestamp: new Date().toISOString()
    }
    console.log('📊 Quiz Data:', JSON.stringify(formattedData, null, 2))
  }, [answers])

  const screens = [
    // Screen 0 - Intro
    {
      type: 'intro',
      title: "Let's build your perfect trip 🧭",
      description: "Answer a few quick questions so we can create a completely personalized itinerary for your vacation.",
      button: "Start"
    },
    // Screen 1 - Destination
    {
      type: 'input',
      question: "Where do you want to go?",
      description: "Tell us your dream destination",
      field: 'destination',
      placeholder: 'e.g., Paris, Tokyo, Bali, New York...'
    },
    // Screen 2 - Travel dates
    {
      type: 'dates',
      question: "When do you want to travel?",
      description: "Select your travel dates",
      fields: ['startDate', 'endDate']
    },
    // Screen 3 - Who are you traveling with?
    {
      type: 'cards',
      question: "You're traveling...",
      options: [
        { id: 'solo', icon: '🧍', label: 'Solo', hasInput: false },
        { id: 'couple', icon: '🧑‍🤝‍🧑', label: 'As a couple', hasInput: false },
        { id: 'family', icon: '👨‍👩‍👧', label: 'With family', hasInput: true, inputLabel: 'How many people?' },
        { id: 'friends', icon: '👥', label: 'With friends', hasInput: true, inputLabel: 'How many people?' }
      ],
      field: 'travelWith'
    },
    // Screen 2 - Budget
    {
      type: 'cards',
      question: "What's your travel range?",
      options: [
        { id: 'budget', icon: '💸', label: 'Budget / Economical', description: 'Essential comfort, best value' },
        { id: 'standard', icon: '💶', label: 'Standard Comfort', description: 'Good quality-price balance' },
        { id: 'boutique', icon: '🌿', label: 'Chic / Boutique & Local', description: 'Unique and authentic experiences' },
        { id: 'premium', icon: '💎', label: 'Premium / Luxury', description: 'High-end service and comfort' }
      ],
      field: 'budget'
    },
    // Screen 3 - Activities ranking
    {
      type: 'ranking',
      question: "Rank your favorite activities",
      description: "Drag your activities from 'Love it' to 'Don't care'",
      activities: [
        { id: 'hiking', icon: '🥾', label: 'Hiking' },
        { id: 'city', icon: '🏙️', label: 'City & streets' },
        { id: 'gastronomy', icon: '🍽️', label: 'Gastronomy' },
        { id: 'wine', icon: '🍷', label: 'Wine / food tours' },
        { id: 'beach', icon: '🏖️', label: 'Beach' },
        { id: 'museums', icon: '⚱️', label: 'Museums' },
        { id: 'adventure', icon: '🧗‍♂️', label: 'Adventure' },
        { id: 'nightlife', icon: '💃', label: 'Nightlife' },
        { id: 'shopping', icon: '🛍️', label: 'Shopping' },
        { id: 'funActivities', icon: '🎡', label: 'Fun activities' },
        { id: 'animals', icon: '🐾', label: 'Animals / nature' },
        { id: 'photography', icon: '📸', label: 'Photo / landscapes' }
      ],
      field: 'activities'
    },
    // Screen 4 - Pace
    {
      type: 'cards',
      question: "Your ideal pace",
      options: [
        { id: 'very-chill', icon: '🌙', label: 'Very chill', description: '1 activity max per day' },
        { id: 'calm-active', icon: '🙂', label: 'Calm but active', description: '2-3 activities per day' },
        { id: 'active', icon: '🔥', label: 'Active', description: 'Full day schedule' },
        { id: 'flexible', icon: '🧘', label: 'Flexible', description: 'Depending on the mood' }
      ],
      field: 'pace'
    },
    // Screen 5 - Discovery style
    {
      type: 'cards',
      question: "You want to discover...",
      options: [
        { id: 'must-see', icon: '⭐', label: 'The must-sees', description: 'Iconic landmarks' },
        { id: 'local-gems', icon: '🔍', label: 'Local gems', description: 'Off the beaten path' },
        { id: 'balanced', icon: '⚖️', label: 'A balanced mix', description: 'Best of both worlds' }
      ],
      field: 'discovery'
    },
    // Screen 6 - Accommodation type
    {
      type: 'cards',
      question: "What type of accommodation do you prefer?",
      options: [
        { id: 'hotel', icon: '🏨', label: 'Hotel' },
        { id: 'apartment', icon: '🏡', label: 'Apartment / Airbnb' },
        { id: 'authentic', icon: '🏠', label: 'Authentic lodging' },
        { id: 'hostel', icon: '🛏️', label: 'Hostel / budget' },
        { id: 'lodge', icon: '🧘', label: 'Lodge / nature' },
        { id: 'luxury', icon: '💎', label: 'Luxury' }
      ],
      field: 'accommodation'
    },
    // Screen 7 - Accommodation priorities
    {
      type: 'multiselect',
      question: "What matters most in your accommodation?",
      description: "Select up to 2 options",
      maxSelect: 2,
      options: [
        { id: 'location', icon: '📍', label: 'Central location' },
        { id: 'quiet', icon: '😴', label: 'Quiet / comfort' },
        { id: 'amenities', icon: '🏊', label: 'Amenities' },
        { id: 'view', icon: '🪟', label: 'View / aesthetics' },
        { id: 'price', icon: '💵', label: 'Low price' },
        { id: 'unique', icon: '✨', label: 'Original / unique' }
      ],
      field: 'accommodationPriorities'
    },
    // Screen 8 - Local transport
    {
      type: 'cards',
      question: "Your style of transport on site",
      options: [
        { id: 'walking', icon: '🚶', label: 'Walking' },
        { id: 'public', icon: '🚇', label: 'Public transport' },
        { id: 'car', icon: '🚗', label: 'Car' },
        { id: 'bike', icon: '🛵', label: 'Bike / scooter' },
        { id: 'minimal', icon: '🧘', label: 'Minimal travel' }
      ],
      field: 'transport'
    },
    // Screen 9 - Main transport
    {
      type: 'cards',
      question: "For your main trip (flight/train)...",
      options: [
        { id: 'direct', icon: '✈️', label: 'Direct only' },
        { id: 'one-stop', icon: '🔁', label: '1 stopover max' },
        { id: 'dont-care', icon: '🌍', label: "I don't care" },
        { id: 'eco', icon: '🌿', label: 'Most eco-friendly option' }
      ],
      field: 'mainTransport'
    },
    // Screen 10 - Ecology importance
    {
      type: 'slider',
      question: "How important is ecology to you?",
      min: 0,
      max: 100,
      labels: ['⚪ Not much', '🟢 Moderately', '🌿 Important', '🍃 Top priority'],
      field: 'ecology'
    }
  ]

  const currentScreenData = screens[currentScreen]

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      // Finish quiz - send data to webhook
      sendToWebhook()
    }
  }

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const sendToWebhook = async () => {
    const formattedData = {
      destination: answers.destination,
      startDate: answers.startDate,
      endDate: answers.endDate,
      travelWith: answers.travelWith,
      groupSize: answers.groupSize || null,
      budget: answers.budget,
      activities: answers.activities,
      pace: answers.pace,
      discovery: answers.discovery,
      accommodation: answers.accommodation,
      accommodationPriorities: answers.accommodationPriorities,
      transport: answers.transport,
      mainTransport: answers.mainTransport,
      ecology: answers.ecology,
      timestamp: new Date().toISOString()
    }

    // Try to send to webhook but don't block navigation if it fails
    try {
      const response = await fetch('http://localhost:5678/webhook/98d548af-d971-41d2-a335-77650714067f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      })

      if (response.ok) {
        console.log('✅ Quiz data sent successfully to webhook')
      } else {
        console.warn('⚠️ Webhook returned non-OK status, but continuing anyway')
      }
    } catch (error) {
      console.warn('⚠️ Could not reach webhook, but continuing to summary page:', error.message)
    }

    // Always navigate to summary page regardless of webhook status
    navigate('/quiz-summary', { state: { quizData: formattedData } })
  }

  const handleAnswer = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field, value) => {
    setAnswers(prev => {
      const current = prev[field] || []
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) }
      } else if (current.length < (currentScreenData.maxSelect || Infinity)) {
        return { ...prev, [field]: [...current, value] }
      }
      return prev
    })
  }

  return (
    <div className="quiz">
      <div className="quiz-logo" onClick={() => navigate('/')}>
        <h1>Travel Agent H</h1>
      </div>

      <div className="quiz-container">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentScreen / (screens.length - 1)) * 100}%` }}
            />
          </div>
          <p className="progress-text">
            {currentScreen === 0 ? 'Start' : `${currentScreen} / ${screens.length - 1}`}
          </p>
        </div>

        <div className="quiz-content">
          {currentScreenData.type === 'intro' && (
            <div className="quiz-intro">
              <h1>{currentScreenData.title}</h1>
              <p>{currentScreenData.description}</p>
              <button className="quiz-btn-primary" onClick={handleNext}>
                {currentScreenData.button}
              </button>
            </div>
          )}

          {currentScreenData.type === 'input' && (
            <div className="quiz-question">
              <h2>{currentScreenData.question}</h2>
              <p className="quiz-description">{currentScreenData.description}</p>
              <input
                type="text"
                placeholder={currentScreenData.placeholder}
                value={answers[currentScreenData.field]}
                onChange={(e) => handleAnswer(currentScreenData.field, e.target.value)}
                className="quiz-input-text"
              />
              <div className="quiz-buttons">
                {currentScreen > 0 && (
                  <button className="quiz-btn-back" onClick={handlePrevious}>
                    ← Back
                  </button>
                )}
                {answers[currentScreenData.field] && (
                  <button className="quiz-btn-next" onClick={handleNext}>
                    Next →
                  </button>
                )}
              </div>
            </div>
          )}

          {currentScreenData.type === 'dates' && (
            <div className="quiz-question">
              <h2>{currentScreenData.question}</h2>
              <p className="quiz-description">{currentScreenData.description}</p>
              <div className="quiz-dates">
                <div className="date-input-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    id="startDate"
                    type="date"
                    value={answers.startDate}
                    onChange={(e) => handleAnswer('startDate', e.target.value)}
                    className="quiz-input-date"
                  />
                </div>
                <div className="date-input-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    id="endDate"
                    type="date"
                    value={answers.endDate}
                    onChange={(e) => handleAnswer('endDate', e.target.value)}
                    className="quiz-input-date"
                    min={answers.startDate}
                  />
                </div>
              </div>
              <div className="quiz-buttons">
                {currentScreen > 0 && (
                  <button className="quiz-btn-back" onClick={handlePrevious}>
                    ← Back
                  </button>
                )}
                {answers.startDate && answers.endDate && (
                  <button className="quiz-btn-next" onClick={handleNext}>
                    Next →
                  </button>
                )}
              </div>
            </div>
          )}

          {currentScreenData.type === 'cards' && (
            <div className="quiz-question">
              <h2>{currentScreenData.question}</h2>
              <div className="quiz-cards">
                {currentScreenData.options.map(option => (
                  <div key={option.id}>
                    <div
                      className={`quiz-card ${answers[currentScreenData.field] === option.id ? 'selected' : ''}`}
                      onClick={() => handleAnswer(currentScreenData.field, option.id)}
                    >
                      <div className="card-icon">{option.icon}</div>
                      <h3>{option.label}</h3>
                      {option.description && <p>{option.description}</p>}
                    </div>
                    {option.hasInput && answers[currentScreenData.field] === option.id && (
                      <input
                        type="number"
                        placeholder={option.inputLabel}
                        value={answers.groupSize}
                        onChange={(e) => handleAnswer('groupSize', e.target.value)}
                        className="quiz-input"
                        min="2"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="quiz-buttons">
                {currentScreen > 0 && (
                  <button className="quiz-btn-back" onClick={handlePrevious}>
                    ← Back
                  </button>
                )}
                {answers[currentScreenData.field] && (
                  <button className="quiz-btn-next" onClick={handleNext}>
                    Next →
                  </button>
                )}
              </div>
            </div>
          )}

          {currentScreenData.type === 'multiselect' && (
            <div className="quiz-question">
              <h2>{currentScreenData.question}</h2>
              <p className="quiz-description">{currentScreenData.description}</p>
              <div className="quiz-cards">
                {currentScreenData.options.map(option => (
                  <div
                    key={option.id}
                    className={`quiz-card ${(answers[currentScreenData.field] || []).includes(option.id) ? 'selected' : ''}`}
                    onClick={() => handleMultiSelect(currentScreenData.field, option.id)}
                  >
                    <div className="card-icon">{option.icon}</div>
                    <h3>{option.label}</h3>
                  </div>
                ))}
              </div>
              <div className="quiz-buttons">
                {currentScreen > 0 && (
                  <button className="quiz-btn-back" onClick={handlePrevious}>
                    ← Back
                  </button>
                )}
                {(answers[currentScreenData.field] || []).length > 0 && (
                  <button className="quiz-btn-next" onClick={handleNext}>
                    Next →
                  </button>
                )}
              </div>
            </div>
          )}

          {currentScreenData.type === 'ranking' && (
            <div className="quiz-question">
              <h2>{currentScreenData.question}</h2>
              <p className="quiz-description">{currentScreenData.description}</p>
              <div className="quiz-ranking">
                {currentScreenData.activities.map((activity, index) => {
                  const isSelected = (answers.activities || []).includes(activity.id)
                  return (
                    <div 
                      key={activity.id} 
                      className={`ranking-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        const newActivities = [...(answers.activities || [])]
                        if (!newActivities.includes(activity.id)) {
                          newActivities.push(activity.id)
                          handleAnswer('activities', newActivities)
                        }
                      }}
                    >
                      <span className="ranking-icon">{activity.icon}</span>
                      <span className="ranking-label">{activity.label}</span>
                      {isSelected && (
                        <span className="ranking-checkmark">✓</span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Selected Activities Summary */}
              {(answers.activities || []).length > 0 && (
                <div className="selected-activities-summary">
                  <h3>✨ Your Selected Activities ({(answers.activities || []).length})</h3>
                  <div className="selected-activities-list">
                    {(answers.activities || []).map((activityId, index) => {
                      const activity = currentScreenData.activities.find(a => a.id === activityId)
                      if (!activity) return null
                      return (
                        <div key={activityId} className="selected-activity-chip">
                          <span className="chip-icon">{activity.icon}</span>
                          <span className="chip-label">{activity.label}</span>
                          <button 
                            className="chip-remove"
                            onClick={(e) => {
                              e.stopPropagation()
                              const newActivities = answers.activities.filter(id => id !== activityId)
                              handleAnswer('activities', newActivities)
                            }}
                          >
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="quiz-buttons">
                {currentScreen > 0 && (
                  <button className="quiz-btn-back" onClick={handlePrevious}>
                    ← Back
                  </button>
                )}
                {(answers.activities || []).length > 0 && (
                  <button className="quiz-btn-next" onClick={handleNext}>
                    Next →
                  </button>
                )}
              </div>
            </div>
          )}

          {currentScreenData.type === 'slider' && (
            <div className="quiz-question">
              <h2>{currentScreenData.question}</h2>
              <div className="quiz-slider">
                <input
                  type="range"
                  min={currentScreenData.min}
                  max={currentScreenData.max}
                  value={answers[currentScreenData.field]}
                  onChange={(e) => handleAnswer(currentScreenData.field, parseInt(e.target.value))}
                  className="slider"
                />
                <div className="slider-labels">
                  {currentScreenData.labels.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
              </div>
              <div className="quiz-buttons">
                {currentScreen > 0 && (
                  <button className="quiz-btn-back" onClick={handlePrevious}>
                    ← Back
                  </button>
                )}
                <button className="quiz-btn-next" onClick={handleNext}>
                  {currentScreen === screens.length - 1 ? 'Finish' : 'Next →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz
