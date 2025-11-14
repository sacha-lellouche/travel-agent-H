import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Inspiration.css'

function Inspiration() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Ici, vous pourrez intégrer votre appel LLM
    // Pour l'instant, on simule un délai
    setTimeout(() => {
      console.log('Prompt envoyé au LLM:', prompt)
      // Simuler une réponse
      setResponse({
        message: 'Your travel inspiration will be processed here...',
        prompt: prompt
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setPrompt('')
    setResponse(null)
  }

  return (
    <div className="inspiration">
      <div className="inspiration-logo" onClick={() => navigate('/')}>
        <h1>Travel Agent H</h1>
      </div>

      <div className="inspiration-container">
        <div className="inspiration-header">
          <h1>Get Inspired for Your Next Adventure</h1>
          <p>Tell us about your dream trip and let our AI create the perfect itinerary for you</p>
        </div>

        <div className="inspiration-content">
          <form onSubmit={handleSubmit} className="prompt-form">
            <div className="form-group">
              <label htmlFor="prompt">Describe your ideal trip</label>
              <textarea
                id="prompt"
                name="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: 3 days with my partner, chill and romantic vibe, from Paris without taking a plane"
                rows="6"
                required
              />
              <div className="prompt-suggestions">
                <p>Need ideas? Try these:</p>
                <div className="suggestions-list">
                  <button type="button" onClick={() => setPrompt("3 days with my partner, chill and romantic vibe, from Paris without taking a plane")}>
                    3 days with my partner, chill and romantic vibe, from Paris without taking a plane
                  </button>
                  <button type="button" onClick={() => setPrompt("Week-long adventure with friends, hiking and outdoor activities, budget-friendly")}>
                    Week-long adventure with friends, hiking and outdoor activities, budget-friendly
                  </button>
                  <button type="button" onClick={() => setPrompt("Solo trip for 5 days, cultural immersion and local food, somewhere warm in winter")}>
                    Solo trip for 5 days, cultural immersion and local food, somewhere warm in winter
                  </button>
                  <button type="button" onClick={() => setPrompt("Family vacation for 10 days, kid-friendly beaches and activities, all-inclusive")}>
                    Family vacation for 10 days, kid-friendly beaches and activities, all-inclusive
                  </button>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? 'Generating Ideas...' : 'Get Inspiration'}
              </button>
              {prompt && (
                <button 
                  type="button" 
                  className="clear-btn"
                  onClick={handleClear}
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {response && (
            <div className="response-section">
              <h2>Your Personalized Travel Inspiration</h2>
              <div className="response-content">
                <p>{response.message}</p>
                <div className="response-meta">
                  <strong>Your prompt:</strong> {response.prompt}
                </div>
              </div>
              <div className="response-actions">
                <button className="action-btn primary">Save This Trip</button>
                <button className="action-btn secondary" onClick={handleClear}>Try Another</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inspiration
