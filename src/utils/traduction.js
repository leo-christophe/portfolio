import { useNavigatorLanguage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';  // Importer l'API i18n
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../data/const';

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
        let currentLang = (storedLang || urlLang || language.value).substring(0, 2);

        if (currentLang != 'un' && currentLang != 'nu') {
            // Update stored language and URL accordingly
            localStorage.setItem('lang', currentLang);
            updateUrlLang(currentLang);  // Ensure URL reflects the current language
        } else {
            localStorage.setItem('lang', DEFAULT_LANGUAGE);
            updateUrlLang(DEFAULT_LANGUAGE);  // Ensure URL reflects the current language
            currentLang = DEFAULT_LANGUAGE;

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
        return lang ? lang.substring(0, 2) : DEFAULT_LANGUAGE;  // Extract base lang (e.g., "fr" from "fr-FR")
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
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        throw new Error(`Langue non supportée : ${lang}`); // Utiliser un seul argument pour le message
    }

    try {
        const url = new URL(window.location.href);

        const validLang = lang || localStorage.getItem('lang') || DEFAULT_LANGUAGE;
        console.log('Langue validée:', validLang);

        url.searchParams.set('lang', validLang);

        if (typeof window.history.replaceState === 'function') {
            window.history.replaceState({}, '', url.href);
            console.log('URL mise à jour:', url.href);
        } else {
            window.history.pushState({}, '', url.href);
            console.warn('replaceState n\'est pas une fonction, impossible de mettre à jour l\'URL');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l’URL:', error);
        throw new Error('Erreur lors de la mise à jour de l’URL'); // Pas besoin de passer l'error ici
    }
}


  

/**
 * @function changeLang
 * @description Change le langage de la page actuelle et met à jour le stockage local
 * @param {string} lang Les deux premières lettres du langage à mettre à jour 
 */
export function changeLang(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        throw new Error('Langue non supportée');
    }

    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    updateUrlLang(lang);
}
