import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import Booking from './pages/Booking'
import About from './pages/About'
import Inspiration from './pages/Inspiration'
import Quiz from './pages/Quiz'
import QuizSummary from './pages/QuizSummary'
import HolidayPlanner from './pages/HolidayPlanner'
import './styles/App.css'

function AppContent() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isInspirationPage = location.pathname === '/inspiration'
  const isQuizPage = location.pathname === '/quiz'
  const isQuizSummaryPage = location.pathname === '/quiz-summary'
  const isHolidayPlannerPage = location.pathname === '/holiday-planner'

  return (
    <div className="app">
      {!isHomePage && !isInspirationPage && !isQuizPage && !isQuizSummaryPage && !isHolidayPlannerPage && <Header />}
      <main className={isHomePage || isInspirationPage || isQuizPage || isQuizSummaryPage || isHolidayPlannerPage ? 'main-content-home' : 'main-content'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-summary" element={<QuizSummary />} />
          <Route path="/holiday-planner" element={<HolidayPlanner />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
