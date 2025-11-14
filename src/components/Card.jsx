import '../styles/Card.css'

function Card({ title, description, image, link }) {
  return (
    <div className="card">
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {link && (
          <a href={link} className="card-link">
            En savoir plus →
          </a>
        )}
      </div>
    </div>
  )
}

export default Card
