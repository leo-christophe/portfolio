let toastInstance = null;

// Fonction d'initialisation pour obtenir une instance du Toast
export function setToastInstance(instance) {
  toastInstance = instance;
}

// Fonction pour afficher une notification de succès
export function showSuccess(message, title = 'Succès') {
  if (toastInstance) {
    toastInstance.add({
      severity: 'success',
      summary: title,
      detail: message,
      life: 3000, // Durée d'affichage en millisecondes
    });
  }
}

// Fonction pour afficher une notification d'erreur
export function showError(message, title = 'Erreur') {
  if (toastInstance) {
    toastInstance.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: 3000,
    });
  }
}

// Fonction pour afficher une notification d'information
export function showInfo(message, title = 'Info') {
  if (toastInstance) {
    toastInstance.add({
      severity: 'info',
      summary: title,
      detail: message,
      life: 3000,
    });
  }
}

// Fonction pour afficher une notification d'avertissement
export function showWarning(message, title = 'Avertissement') {
  if (toastInstance) {
    toastInstance.add({
      severity: 'warn',
      summary: title,
      detail: message,
      life: 3000,
    });
  }
}
