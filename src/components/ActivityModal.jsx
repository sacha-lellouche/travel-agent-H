import { useState } from 'react'

function ActivityModal({ activity, onClose, onSave, onDelete }) {
  const [editedText, setEditedText] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const formatDuration = (minutes) => {
    if (!minutes) return ''
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0 && mins > 0) {
      return `${hours}h${mins}`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${mins}min`
    }
  }

  const getActivityText = () => {
    return `${activity.nom}

• Type : ${activity.type}
• Jour : ${activity.jour}
• Heure : ${activity.heure_debut}${activity.duree ? ' - Durée : ' + formatDuration(activity.duree) : ''}
• Lieu : ${activity.lieu || 'Non spécifié'}
${activity.description ? '\n• Description : ' + activity.description : ''}`
  }

  const handleEdit = () => {
    setEditedText(getActivityText())
    setIsEditing(true)
  }

  const handleSave = () => {
    // Parser le texte édité pour extraire les informations
    const lines = editedText.split('\n')
    const newActivity = { ...activity }
    
    lines.forEach(line => {
      const trimmed = line.trim()
      if (trimmed.startsWith('• Type :')) {
        newActivity.type = trimmed.replace('• Type :', '').trim()
      } else if (trimmed.startsWith('• Jour :')) {
        newActivity.jour = parseInt(trimmed.replace('• Jour :', '').trim())
      } else if (trimmed.startsWith('• Heure :')) {
        const heurePart = trimmed.replace('• Heure :', '').split('-')[0].trim()
        newActivity.heure_debut = heurePart
        if (trimmed.includes('Durée :')) {
          const dureePart = trimmed.split('Durée :')[1].trim()
          // Convertir format type "2h" ou "90min" en minutes
          if (dureePart.includes('h')) {
            const hours = parseInt(dureePart)
            const mins = dureePart.includes('h') && dureePart.split('h')[1] ? parseInt(dureePart.split('h')[1]) : 0
            newActivity.duree = hours * 60 + (mins || 0)
          } else {
            newActivity.duree = parseInt(dureePart)
          }
        }
      } else if (trimmed.startsWith('• Lieu :')) {
        newActivity.lieu = trimmed.replace('• Lieu :', '').trim()
      } else if (trimmed.startsWith('• Description :')) {
        newActivity.description = trimmed.replace('• Description :', '').trim()
      } else if (!trimmed.startsWith('•') && trimmed.length > 0 && lines.indexOf(line) === 0) {
        newActivity.nom = trimmed
      }
    })
    
    onSave(newActivity)
    setIsEditing(false)
  }

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content modal-simple">
        <div className="modal-header">
          <h2>Détails de l'activité</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body-simple">
          {!isEditing ? (
            <>
              <div className="activity-info-text">
                <pre>{getActivityText()}</pre>
              </div>
              <div className="modal-footer-simple">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(activity.id)}
                >
                  🗑️ Supprimer
                </button>
                <div className="footer-right">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEdit}
                  >
                    ✏️ Modifier
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <textarea
                className="edit-textarea"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows="12"
              />
              <div className="modal-footer-simple">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  💾 Enregistrer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActivityModal
