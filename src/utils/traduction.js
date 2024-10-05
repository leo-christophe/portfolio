import { useNavigatorLanguage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';  // Importer l'API i18n

/**
 * @function traductionSetup
 * @description Configure la traduction de la page en fonction de la langue de l'utilisateur
 * @returns {string} Le langage actuel de la page
 */
export function traductionSetup() {
    
    let storedLang = localStorage.getItem('lang');
    const { language } = useNavigatorLanguage();
    const { locale } = useI18n();

    // Wait for URL lang to be available (for safety) by using setTimeout
    setTimeout(() => {
        const urlLang = getLangFromUrl();  // Get lang from URL if present
        
        if (!storedLang) {
            storedLang = 'en';
        }

        // Get only the two-letter language code (fr instead of fr-FR)
        const currentLang = (urlLang || storedLang || language.value).substring(0, 2);

        // Set the locale based on the prioritized language
        locale.value = currentLang;

        // Update stored language and URL accordingly
        localStorage.setItem('lang', currentLang);
        updateUrlLang(currentLang);  // Make sure URL reflects the current language

        // Ensure the language is changed globally
        changeLang(currentLang);

        return currentLang;
    }, 0);  // Run after the rest of the setup has completed
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
    window.history.pushState({}, '', url);  // Update the URL without reloading the page
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
