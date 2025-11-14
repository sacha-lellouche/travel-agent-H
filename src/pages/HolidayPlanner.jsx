import { useState, useRef } from 'react'
import KanbanBoard from '../components/KanbanBoard'
import ActivityModal from '../components/ActivityModal'
import '../styles/HolidayPlanner.css'

function HolidayPlanner() {
  const [activities, setActivities] = useState([])
  const [pendingActivities, setPendingActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)

  // Charger le fichier JSON
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result)
          // S'assurer que chaque activité a un ID unique
          const activitiesWithIds = jsonData.activities.map((activity, index) => ({
            ...activity,
            id: activity.id || `activity-${index}-${Date.now()}`
          }))
          setActivities(activitiesWithIds)
          // Charger les activités en attente si présentes
          if (jsonData.pendingActivities) {
            const pendingWithIds = jsonData.pendingActivities.map((activity, index) => ({
              ...activity,
              id: activity.id || `pending-${index}-${Date.now()}`
            }))
            setPendingActivities(pendingWithIds)
          }
        } catch (error) {
          alert('Erreur lors de la lecture du fichier JSON: ' + error.message)
        }
      }
      reader.readAsText(file)
    }
  }

  // Charger l'exemple par défaut
  const handleLoadExample = async () => {
    try {
      const response = await fetch('/example-trip.json')
      const jsonData = await response.json()
      const activitiesWithIds = jsonData.activities.map((activity, index) => ({
        ...activity,
        id: activity.id || `activity-${index}-${Date.now()}`
      }))
      setActivities(activitiesWithIds)
      // Charger les activités en attente si présentes
      if (jsonData.pendingActivities) {
        const pendingWithIds = jsonData.pendingActivities.map((activity, index) => ({
          ...activity,
          id: activity.id || `pending-${index}-${Date.now()}`
        }))
        setPendingActivities(pendingWithIds)
      }
      setFileName('example-trip.json')
    } catch (error) {
      alert('Erreur lors du chargement de l\'exemple: ' + error.message)
    }
  }

  // Exporter le JSON modifié
  const handleExport = () => {
    const dataStr = JSON.stringify({ 
      activities, 
      pendingActivities: pendingActivities.length > 0 ? pendingActivities : undefined 
    }, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName || 'modified-trip.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  // Ouvrir la modale pour voir/éditer une activité
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  // Fermer la modale
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedActivity(null)
  }

  // Sauvegarder les modifications d'une activité
  const handleSaveActivity = (updatedActivity) => {
    if (updatedActivity.id.startsWith('pending-')) {
      setPendingActivities(pendingActivities.map(act => 
        act.id === updatedActivity.id ? updatedActivity : act
      ))
    } else {
      setActivities(activities.map(act => 
        act.id === updatedActivity.id ? updatedActivity : act
      ))
    }
    handleCloseModal()
  }

  // Supprimer une activité
  const handleDeleteActivity = (activityId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      if (activityId.startsWith('pending-')) {
        setPendingActivities(pendingActivities.filter(act => act.id !== activityId))
      } else {
        setActivities(activities.filter(act => act.id !== activityId))
      }
      handleCloseModal()
    }
  }

  // Ajouter une nouvelle activité
  const handleAddActivity = () => {
    const newActivity = {
      id: `activity-new-${Date.now()}`,
      nom: 'Nouvelle activité',
      type: 'Visite',
      duree: 60,
      lieu: '',
      jour: activities.length > 0 ? activities[0].jour : 1,
      heure_debut: '09:00',
      description: ''
    }
    setActivities([...activities, newActivity])
    setSelectedActivity(newActivity)
    setIsModalOpen(true)
  }

  // Ajouter une activité en attente
  const handleAddPendingActivity = () => {
    const newActivity = {
      id: `pending-new-${Date.now()}`,
      nom: 'Activité à planifier',
      type: 'Visite',
      duree: 60,
      lieu: '',
      description: ''
    }
    setPendingActivities([...pendingActivities, newActivity])
    setSelectedActivity(newActivity)
    setIsModalOpen(true)
  }

  // Supprimer une activité en attente
  const handleDeletePendingActivity = (activityId) => {
    setPendingActivities(pendingActivities.filter(act => act.id !== activityId))
  }

  // Déplacer une activité en attente vers le planning
  const handleMoveToPlan = (pendingActivity) => {
    const newActivity = {
      ...pendingActivity,
      id: `activity-${Date.now()}`,
      jour: 1,
      heure_debut: '09:00'
    }
    setActivities([...activities, newActivity])
    setPendingActivities(pendingActivities.filter(act => act.id !== pendingActivity.id))
  }

  // Mettre à jour les activités après drag-and-drop
  const handleUpdateActivities = (updatedActivities) => {
    setActivities(updatedActivities)
  }

  // Mettre à jour les activités en attente après drag-and-drop
  const handleUpdatePendingActivities = (updatedPendingActivities) => {
    setPendingActivities(updatedPendingActivities)
  }

  return (
    <div className="holiday-planner">
      <div className="planner-header">
        <h1>Planificateur de Voyage</h1>
        <p>Organisez votre itinéraire avec notre tableau Kanban interactif</p>
      </div>

      <div className="planner-controls">
        <div className="file-controls">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            style={{ display: 'none' }}
          />
          <button 
            className="btn btn-primary"
            onClick={() => fileInputRef.current.click()}
          >
            📁 Charger un fichier JSON
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleLoadExample}
          >
            📋 Charger l'exemple
          </button>
          {fileName && <span className="file-name">📄 {fileName}</span>}
        </div>

        {activities.length > 0 && (
          <div className="action-controls">
            <button 
              className="btn btn-success"
              onClick={handleAddActivity}
            >
              ➕ Ajouter une activité
            </button>
            <button 
              className="btn btn-export"
              onClick={handleExport}
            >
              💾 Exporter JSON
            </button>
          </div>
        )}
      </div>

      {activities.length > 0 ? (
        <KanbanBoard
          activities={activities}
          pendingActivities={pendingActivities}
          onActivityClick={handleActivityClick}
          onUpdateActivities={handleUpdateActivities}
          onUpdatePendingActivities={handleUpdatePendingActivities}
        />
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h2>Aucun itinéraire chargé</h2>
          <p>Chargez un fichier JSON ou utilisez l'exemple pour commencer</p>
        </div>
      )}

      {isModalOpen && selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          onClose={handleCloseModal}
          onSave={handleSaveActivity}
          onDelete={handleDeleteActivity}
        />
      )}
    </div>
  )
}

export default HolidayPlanner
