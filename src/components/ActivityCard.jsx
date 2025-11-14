function ActivityCard({ activity, onClick, isDragging }) {
  // Icônes selon le type d'activité
  const getActivityIcon = (type) => {
    const icons = {
      'Visite': '🏛️',
      'Restaurant': '🍽️',
      'Transport': '🚗',
      'Hébergement': '🏨',
      'Loisir': '🎭',
      'Sport': '⚽',
      'Shopping': '🛍️',
      'Nature': '🌲',
      'Plage': '🏖️',
      'Musée': '🖼️',
      'default': '📍'
    }
    return icons[type] || icons['default']
  }

  // Couleur selon le type d'activité (fond pastel + bordure)
  const getActivityColor = (type) => {
    const colors = {
      // Activités culturelles (violet pastel)
      'Visite': { bg: '#f3e5f5', border: '#9c27b0', text: '#6a1b9a' },
      'Musée': { bg: '#ede7f6', border: '#673ab7', text: '#512da8' },
      'Loisir': { bg: '#ffebee', border: '#e91e63', text: '#c2185b' },
      
      // Repas (orange pastel)
      'Restaurant': { bg: '#fff3e0', border: '#ff9800', text: '#ef6c00' },
      
      // Sport et nature (vert/bleu pastel)
      'Sport': { bg: '#e8f5e9', border: '#4caf50', text: '#388e3c' },
      'Nature': { bg: '#e0f2f1', border: '#009688', text: '#00796b' },
      'Plage': { bg: '#e3f2fd', border: '#2196f3', text: '#1976d2' },
      
      // Autres
      'Transport': { bg: '#f5f5f5', border: '#9e9e9e', text: '#616161' },
      'Hébergement': { bg: '#eceff1', border: '#607d8b', text: '#455a64' },
      'Shopping': { bg: '#fff8e1', border: '#ffc107', text: '#f57c00' },
      'default': { bg: '#e3f2fd', border: '#2196f3', text: '#1976d2' }
    }
    return colors[type] || colors['default']
  }

  // Formater la durée
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

  const handleMenuClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  // Vue calendrier : affichage ultra compact
  if (isDragging === false || isDragging === true) {
    // Mode calendrier
    const colors = getActivityColor(activity.type)
    return (
      <div 
        className={`activity-card calendar-view ${isDragging ? 'dragging' : ''}`}
        style={{ 
          backgroundColor: colors.bg,
          borderLeftColor: colors.border,
          borderLeftWidth: '4px'
        }}
      >
        <div className="calendar-card-content">
          <div className="calendar-card-header">
            <span className="activity-icon-small">{getActivityIcon(activity.type)}</span>
            <h4 className="activity-name-compact" style={{ color: colors.text }}>
              {activity.nom}
            </h4>
            <button className="menu-button-small" onClick={handleMenuClick} title="Voir les détails">
              ⋮
            </button>
          </div>
          <div className="calendar-card-body">
            <div className="calendar-time-info" style={{ color: colors.text }}>
              <span className="time-compact">🕐 {activity.heure_debut}</span>
              {activity.duree && (
                <span className="duration-compact"> • {formatDuration(activity.duree)}</span>
              )}
            </div>
            {activity.lieu && (
              <div className="calendar-location" style={{ color: colors.text }}>
                📍 {activity.lieu.length > 25 ? activity.lieu.substring(0, 25) + '...' : activity.lieu}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Vue par défaut (ancienne vue)
  const colors = getActivityColor(activity.type)
  return (
    <div 
      className={`activity-card ${isDragging ? 'dragging' : ''}`}
      style={{ 
        backgroundColor: colors.bg,
        borderLeftColor: colors.border 
      }}
    >
      <div className="card-header-row">
        <div className="card-left">
          <span className="activity-icon">{getActivityIcon(activity.type)}</span>
          <div className="card-info">
            <h4 className="activity-name" style={{ color: colors.text }}>{activity.nom}</h4>
            <span className="activity-type" style={{ color: colors.border }}>
              {activity.type}
            </span>
          </div>
        </div>
        <button className="menu-button" onClick={handleMenuClick} title="Voir les détails">
          ⋮
        </button>
      </div>
      
      <div className="card-footer">
        <span className="activity-time">
          🕐 {activity.heure_debut}
          {activity.duree && (
            <span className="duration"> • {formatDuration(activity.duree)}</span>
          )}
        </span>
        {activity.lieu && (
          <span className="activity-location" title={activity.lieu}>
            📍 {activity.lieu.length > 20 ? activity.lieu.substring(0, 20) + '...' : activity.lieu}
          </span>
        )}
      </div>
    </div>
  )
}

export default ActivityCard
