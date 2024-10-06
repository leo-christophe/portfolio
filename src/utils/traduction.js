import { useNavigatorLanguage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';  // Importer l'API i18n

/**
 * @function traductionSetup
 * @description Configure la traduction de la page en fonction de la langue de l'utilisateur
 * @resolve {string} La langue actuelle de la page
 */
export function traductionSetup() {
    return new Promise((resolve, reject) => {
        let storedLang = localStorage.getItem('lang');
        const { language } = useNavigatorLanguage();
        const { locale } = useI18n();

        // Get lang from URL if present
        const urlLang = getLangFromUrl();  

        // Get only the two-letter language code (fr instead of fr-FR)
        const currentLang = (storedLang || urlLang || language.value).substring(0, 2);

        if (currentLang != undefined || currentLang != null) {
            // Update stored language and URL accordingly
            localStorage.setItem('lang', currentLang);
            updateUrlLang(currentLang);  // Ensure URL reflects the current language
        } else {
            reject('Erreur lors de la configuration de la langue dans le localStorage');
        }

        // Set the locale based on the prioritized language
        locale.value = currentLang;
        
        // Ensure the language is changed globally
        changeLang(currentLang);

        // Resolve the promise with the current language
        resolve(currentLang); 
    });
}


/**
 * @function getLangFromUrl
 * @description Extrait le langage de l'URL de la page actuelle (si présent)
 * @returns {string} Le langage extrait de l'URL
 */
export function getLangFromUrl() {
    try {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get('lang');
        return lang ? lang.substring(0, 2) : 'fr';  // Extract base lang (e.g., "fr" from "fr-FR")
    } catch (error) {
        console.error('Error parsing URL parameters:', error);
        return null;  // Fallback to null if there's any error
    }
}

/**
 * @function updateUrlLang
 * @description Met à jour le paramètre "lang" de l'URL actuelle sans recharger la page
 * @param {string} lang 
 */
export function updateUrlLang(lang) {
    const url = new URL(window.location.href);  // Get the current URL
    url.searchParams.set('lang', lang);  // Set the "lang" parameter
    window.history.pushState({}, '', url.href);  // Update the URL without reloading the page
}

/**
 * @function changeLang
 * @description Change le langage de la page actuelle et met à jour le stockage local
 * @param {string} lang Les deux premières lettres du langage à mettre à jour 
 */
export function changeLang(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    updateUrlLang(lang);
}
