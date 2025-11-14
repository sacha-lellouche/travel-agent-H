import '../styles/About.css'

function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>À propos de Travel Agent H</h1>
        <p>Votre partenaire de confiance pour des voyages inoubliables</p>
      </div>

      <section className="about-content">
        <div className="about-section">
          <h2>Notre Histoire</h2>
          <p>
            Fondée en 2020, Travel Agent H est née de la passion pour le voyage et 
            le désir d'offrir des expériences uniques et authentiques à nos clients. 
            Nous croyons que chaque voyage est une opportunité de découvrir, d'apprendre 
            et de créer des souvenirs inoubliables.
          </p>
        </div>

        <div className="about-section">
          <h2>Notre Mission</h2>
          <p>
            Notre mission est de rendre le voyage accessible, agréable et enrichissant 
            pour tous. Nous nous engageons à fournir un service personnalisé, des conseils 
            d'experts et les meilleurs tarifs pour que votre expérience de voyage soit 
            exceptionnelle du début à la fin.
          </p>
        </div>

        <div className="about-section">
          <h2>Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value">
              <h3>🤝 Confiance</h3>
              <p>Nous bâtissons des relations durables basées sur la confiance et la transparence</p>
            </div>
            <div className="value">
              <h3>⭐ Excellence</h3>
              <p>Nous visons l'excellence dans chaque aspect de nos services</p>
            </div>
            <div className="value">
              <h3>🌱 Durabilité</h3>
              <p>Nous promouvons un tourisme responsable et respectueux de l'environnement</p>
            </div>
            <div className="value">
              <h3>💡 Innovation</h3>
              <p>Nous adoptons les nouvelles technologies pour améliorer votre expérience</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Notre Équipe</h2>
          <p>
            Notre équipe est composée de professionnels passionnés du voyage, chacun 
            apportant son expertise unique. Avec plus de 50 ans d'expérience cumulée 
            dans l'industrie du tourisme, nous sommes là pour vous guider à chaque 
            étape de votre voyage.
          </p>
        </div>

        <div className="about-section stats">
          <h2>Quelques chiffres</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>10,000+</h3>
              <p>Clients satisfaits</p>
            </div>
            <div className="stat">
              <h3>150+</h3>
              <p>Destinations</p>
            </div>
            <div className="stat">
              <h3>98%</h3>
              <p>Taux de satisfaction</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Support client</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <h2>Prêt à partir à l'aventure ?</h2>
        <p>Contactez-nous dès aujourd'hui pour planifier votre prochain voyage</p>
        <a href="/booking" className="cta-button">Réserver maintenant</a>
      </section>
    </div>
  )
}

export default About
