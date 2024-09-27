// Fonction pour sauvegarder dans le localStorage
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

// Fonction pour restaurer du localStorage
export function restoreFromLocalStorage(key, defaultValue = null) {
const savedValue = localStorage.getItem(key)
return savedValue ? JSON.parse(savedValue) : defaultValue
}

// Fonction pour récupérer la date la plus ancienne d'une liste de projets
export function getEarliestDate(projectDates) {
return projectDates.reduce((earliest, current) => {
    return current.start < earliest ? current.start : earliest
}, projectDates[0].start)
}

// Fonction pour récupérer la date la plus récente d'une liste de projets
export function getLatestDate(projectDates, t) {
return projectDates.reduce((latest, current) => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (current.end.getDate() === new Date().getDate()) {
    current.end = tomorrow
    }

    return current.end > latest ? current.end : latest
}, projectDates[0].end)
}
