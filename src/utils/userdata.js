/**
 * @function isMobile
 * @description Vérifie si l'utilisateur est sur un appareil mobile
 * @returns {Boolean} Retourne true si l'utilisateur est sur un appareil mobile
 */
export function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

/**
 * @function copyToClipboard
 * @description Copie le texte passé en paramètre dans le presse-papier
 * @param {String} text  Le texte à copier
 * @param {ToastServiceMethods} toastService  Le service de toast (PrimeVue)
 * @param {ComposerTranslation} tradService Le service de traduction (i18n)
 */
export const copyToClipboard = async (text, toastService, tradService) => {
    // Vérification des paramètres
    if (!navigator.clipboard) {
        throw new Error('Le presse-papier n\'est pas supporté par votre navigateur');
    } else if (!text) {
        throw new Error('Aucun texte à copier');
    } else if (!toastService) {
        throw new Error('Aucun service de toast fourni');
    } else if (!tradService) {
        throw new Error('Aucun service de traduction fourni');
    } else if (typeof text !== 'string') {
        throw new Error('Le texte à copier doit être une chaîne de caractères');
    } 

    try {
      await navigator.clipboard.writeText(text);

      if (!isMobile()) {
        toastService.add({ 
          severity: 'info', 
          summary: tradService('message.copySummary'), 
          detail: tradService('message.copyMessage'), 
          life: 2500 
        });
      }

      return true;
    } catch (error) {
      if (!isMobile()) {
          toastService.add({ 
          severity: 'error', 
          summary: tradService('message.error'), 
          detail: tradService('message.errorMessage'), 
          life: 2500 
        });
      }
      return false;
    }
  };
  