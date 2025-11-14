import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import ActivityCard from './ActivityCard'

function KanbanBoard({ activities, pendingActivities, onActivityClick, onUpdateActivities, onUpdatePendingActivities }) {
  // Générer les créneaux horaires (de 6h à 23h par défaut)
  const startHour = 6
  const endHour = 24
  const timeSlots = []
  for (let hour = startHour; hour < endHour; hour++) {
    timeSlots.push(`${String(hour).padStart(2, '0')}:00`)
  }

  // Hauteur de chaque heure en pixels
  const hourHeight = 60

  // Calculer la position verticale d'une activité selon son heure
  const getActivityPosition = (heure_debut) => {
    const [hours, minutes] = heure_debut.split(':').map(Number)
    const totalMinutes = (hours - startHour) * 60 + minutes
    return (totalMinutes / 60) * hourHeight
  }

  // Calculer la hauteur d'une activité selon sa durée
  const getActivityHeight = (duree) => {
    return (duree / 60) * hourHeight
  }

  // Grouper les activités par jour
  const groupActivitiesByDay = () => {
    const grouped = {}
    activities.forEach(activity => {
      const day = activity.jour
      if (!grouped[day]) {
        grouped[day] = []
      }
      grouped[day].push(activity)
    })

    // Trier les activités de chaque jour par heure_debut
    Object.keys(grouped).forEach(day => {
      grouped[day].sort((a, b) => {
        const timeA = a.heure_debut || '00:00'
        const timeB = b.heure_debut || '00:00'
        return timeA.localeCompare(timeB)
      })
    })

    return grouped
  }

  const activityGroups = groupActivitiesByDay()
  const days = Object.keys(activityGroups).sort((a, b) => Number(a) - Number(b))

  // Convertir l'heure en minutes depuis minuit
  const timeToMinutes = (time) => {
    if (!time) return 0
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  // Convertir les minutes en heure (format HH:MM)
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }

  // Arrondir au créneau de 30 min le plus proche
  const snapToSlot = (minutes) => {
    return Math.round(minutes / 30) * 30
  }

  // Gérer le drag and drop avec vérification des conflits
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result

    // Pas de destination = abandon
    if (!destination) return

    // Même position = pas de changement
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const isFromPending = source.droppableId === 'pending'
    const isToPending = destination.droppableId === 'pending'

    // Cas 1: De pending vers un jour
    if (isFromPending && !isToPending) {
      const destDay = Number(destination.droppableId.replace('day-', ''))
      const pendingActivity = pendingActivities.find(act => act.id === draggableId)
      
      if (!pendingActivity) return

      // Créer une nouvelle activité pour le planning
      const newActivity = {
        ...pendingActivity,
        id: `activity-${Date.now()}`,
        jour: destDay,
        heure_debut: '09:00'
      }

      // Calculer l'horaire optimal
      const destDayActivities = activityGroups[destDay] || []
      const activityDuration = newActivity.duree || 60

      if (destination.index === 0 && destDayActivities.length > 0) {
        const firstActivity = destDayActivities[0]
        const firstTime = timeToMinutes(firstActivity.heure_debut)
        const newTime = Math.max(0, firstTime - activityDuration - 30)
        newActivity.heure_debut = minutesToTime(snapToSlot(newTime))
      } else if (destination.index >= destDayActivities.length) {
        const lastActivity = destDayActivities[destDayActivities.length - 1]
        if (lastActivity) {
          const lastTime = timeToMinutes(lastActivity.heure_debut)
          const lastDuration = lastActivity.duree || 60
          const newTime = Math.min(1440 - activityDuration, lastTime + lastDuration + 30)
          newActivity.heure_debut = minutesToTime(snapToSlot(newTime))
        }
      } else {
        const beforeActivity = destDayActivities[destination.index - 1]
        const afterActivity = destDayActivities[destination.index]
        
        if (beforeActivity && afterActivity) {
          const beforeTime = timeToMinutes(beforeActivity.heure_debut)
          const beforeDuration = beforeActivity.duree || 60
          const afterTime = timeToMinutes(afterActivity.heure_debut)
          
          const earliestStart = beforeTime + beforeDuration + 30
          const latestStart = afterTime - activityDuration - 30
          
          if (earliestStart <= latestStart) {
            const newTime = Math.floor((earliestStart + latestStart) / 2)
            newActivity.heure_debut = minutesToTime(snapToSlot(newTime))
          } else {
            newActivity.heure_debut = minutesToTime(snapToSlot(earliestStart))
          }
        } else if (beforeActivity) {
          const beforeTime = timeToMinutes(beforeActivity.heure_debut)
          const beforeDuration = beforeActivity.duree || 60
          const newTime = Math.min(1440 - activityDuration, beforeTime + beforeDuration + 30)
          newActivity.heure_debut = minutesToTime(snapToSlot(newTime))
        }
      }

      onUpdateActivities([...activities, newActivity])
      onUpdatePendingActivities(pendingActivities.filter(act => act.id !== draggableId))
      return
    }

    // Cas 2: D'un jour vers pending
    if (!isFromPending && isToPending) {
      const activity = activities.find(act => act.id === draggableId)
      
      if (!activity) return

      // Créer une activité pending (sans jour ni heure)
      const newPendingActivity = {
        ...activity,
        id: `pending-${Date.now()}`
      }
      delete newPendingActivity.jour
      delete newPendingActivity.heure_debut

      onUpdateActivities(activities.filter(act => act.id !== draggableId))
      onUpdatePendingActivities([...pendingActivities, newPendingActivity])
      return
    }

    // Cas 3: Entre deux jours (logique existante)
    if (!isFromPending && !isToPending) {
      const sourceDay = Number(source.droppableId.replace('day-', ''))
      const destDay = Number(destination.droppableId.replace('day-', ''))

      const updatedActivities = [...activities]
      const activityIndex = updatedActivities.findIndex(act => act.id === draggableId)
      const activity = { ...updatedActivities[activityIndex] }
      const activityDuration = activity.duree || 60

      activity.jour = destDay

      const destDayActivities = activityGroups[destDay] || []
      
      if (destination.index === 0 && destDayActivities.length > 0) {
        const firstActivity = destDayActivities[0]
        if (firstActivity.id !== draggableId) {
          const firstTime = timeToMinutes(firstActivity.heure_debut)
          const newTime = Math.max(0, firstTime - activityDuration - 30)
          activity.heure_debut = minutesToTime(snapToSlot(newTime))
        }
      } else if (destination.index >= destDayActivities.length) {
        const lastActivity = destDayActivities[destDayActivities.length - 1]
        if (lastActivity && lastActivity.id !== draggableId) {
          const lastTime = timeToMinutes(lastActivity.heure_debut)
          const lastDuration = lastActivity.duree || 60
          const newTime = Math.min(1440 - activityDuration, lastTime + lastDuration + 30)
          activity.heure_debut = minutesToTime(snapToSlot(newTime))
        }
      } else {
        let beforeActivity, afterActivity
        let adjustedIndex = destination.index
        
        if (sourceDay === destDay && source.index < destination.index) {
          adjustedIndex = destination.index + 1
        }

        const sortedDestActivities = [...destDayActivities].filter(a => a.id !== draggableId)
        beforeActivity = sortedDestActivities[adjustedIndex - 1]
        afterActivity = sortedDestActivities[adjustedIndex]

        if (beforeActivity && afterActivity) {
          const beforeTime = timeToMinutes(beforeActivity.heure_debut)
          const beforeDuration = beforeActivity.duree || 60
          const afterTime = timeToMinutes(afterActivity.heure_debut)
          
          const earliestStart = beforeTime + beforeDuration + 30
          const latestStart = afterTime - activityDuration - 30
          
          if (earliestStart <= latestStart) {
            const newTime = Math.floor((earliestStart + latestStart) / 2)
            activity.heure_debut = minutesToTime(snapToSlot(newTime))
          } else {
            activity.heure_debut = minutesToTime(snapToSlot(earliestStart))
          }
        } else if (beforeActivity) {
          const beforeTime = timeToMinutes(beforeActivity.heure_debut)
          const beforeDuration = beforeActivity.duree || 60
          const newTime = Math.min(1440 - activityDuration, beforeTime + beforeDuration + 30)
          activity.heure_debut = minutesToTime(snapToSlot(newTime))
        } else if (afterActivity) {
          const afterTime = timeToMinutes(afterActivity.heure_debut)
          const newTime = Math.max(0, afterTime - activityDuration - 30)
          activity.heure_debut = minutesToTime(snapToSlot(newTime))
        }
      }

      updatedActivities[activityIndex] = activity
      onUpdateActivities(updatedActivities)
      return
    }

    // Cas 4: Réorganisation dans pending
    if (isFromPending && isToPending) {
      const newPendingActivities = Array.from(pendingActivities)
      const [movedActivity] = newPendingActivities.splice(source.index, 1)
      newPendingActivities.splice(destination.index, 0, movedActivity)
      onUpdatePendingActivities(newPendingActivities)
      return
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="calendar-container">
        {/* Timeline avec horaires */}
        <div className="calendar-timeline">
          <div className="timeline-header">Horaire</div>
          <div className="timeline-body">
            {timeSlots.map((time, index) => (
              <div key={time} className="timeline-slot" style={{ height: `${hourHeight}px` }}>
                <span className="timeline-time">{time}</span>
                <div className="timeline-line"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonnes des jours avec vue calendrier */}
        <div className="calendar-days">
          {days.map(day => {
            const dayActivities = activityGroups[day] || []
            return (
              <div key={day} className="calendar-day-column">
                <div className="day-header">
                  <h3>Jour {day}</h3>
                  <span className="activity-count">
                    {dayActivities.length} activité{dayActivities.length > 1 ? 's' : ''}
                  </span>
                </div>
                
                <Droppable droppableId={`day-${day}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`day-timeline ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      style={{ 
                        minHeight: `${(endHour - startHour) * hourHeight}px`,
                        position: 'relative'
                      }}
                    >
                      {/* Lignes de grille pour chaque heure */}
                      {timeSlots.map((time, index) => (
                        <div 
                          key={time} 
                          className="grid-line" 
                          style={{ 
                            top: `${index * hourHeight}px`,
                            height: `${hourHeight}px`
                          }}
                        />
                      ))}

                      {/* Activités positionnées selon leur horaire */}
                      {dayActivities.map((activity, index) => {
                        const top = getActivityPosition(activity.heure_debut)
                        const height = getActivityHeight(activity.duree || 60)
                        
                        return (
                          <Draggable
                            key={activity.id}
                            draggableId={activity.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="calendar-activity-wrapper"
                                style={{
                                  ...provided.draggableProps.style,
                                  position: 'absolute',
                                  top: `${top}px`,
                                  left: '8px',
                                  right: '8px',
                                  height: `${height}px`,
                                  zIndex: snapshot.isDragging ? 1000 : 1
                                }}
                              >
                                <ActivityCard
                                  activity={activity}
                                  onClick={() => onActivityClick(activity)}
                                  isDragging={snapshot.isDragging}
                                  isCalendarView={true}
                                />
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                      
                      {provided.placeholder}
                      {dayActivities.length === 0 && (
                        <div className="empty-day" style={{ top: `${2 * hourHeight}px` }}>
                          Glissez une activité ici
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </div>

      {/* Zone des activités en attente avec drag-and-drop */}
      <div className="pending-activities-section">
        <div className="pending-header">
          <h2>🗂️ Activités à planifier</h2>
          <p className="pending-hint">Glissez les activités dans le planning ou depuis le planning vers cette zone</p>
        </div>
        
        <Droppable droppableId="pending" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`pending-activities-grid ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            >
              {pendingActivities.map((activity, index) => (
                <Draggable
                  key={activity.id}
                  draggableId={activity.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      className={`pending-card ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <div className="pending-card-content">
                        <span className="pending-icon">
                          {activity.type === 'Restaurant' ? '🍽️' : 
                           activity.type === 'Visite' ? '🏛️' : 
                           activity.type === 'Sport' ? '⚽' : 
                           activity.type === 'Musée' ? '🖼️' : '📍'}
                        </span>
                        <div className="pending-info">
                          <h4>{activity.nom}</h4>
                          <span className="pending-type">{activity.type} • {activity.duree || 60}min</span>
                        </div>
                      </div>
                      <div className="pending-actions">
                        <button 
                          className="btn-icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onActivityClick(activity)
                          }}
                          title="Voir les détails"
                        >
                          ⋮
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {pendingActivities.length === 0 && (
                <div className="pending-empty">
                  <p>Glissez des activités du planning ici pour les retirer temporairement</p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard
