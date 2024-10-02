
import { useNavigatorLanguage } from '@vueuse/core'
import { useI18n } from 'vue-i18n';  // Importer l'API i18n

export function traductionSetup() {
    let storedLang = localStorage.getItem('lang');
    const { language } = useNavigatorLanguage();
    const { locale } = useI18n();

    // Wait for URL lang to be available (for safety) by using setTimeout
    setTimeout(() => {
        const urlLang = getLangFromUrl();  // Get lang from URL if present
        
        if (storedLang == null){
            storedLang = 'en'
        }

        // Priority order: 1. URL lang, 2. stored lang, 3. browser lang
        const currentLang = storedLang  || language.value || urlLang;

        if (currentLang == null){
            currentLang = locale
        }
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



export function getLangFromUrl() {
    try {
        const params = new URLSearchParams(window.location.search);
        return params.get('lang') || 'fr';  // Return null if no lang parameter
    } catch (error) {
        console.error('Error parsing URL parameters:', error);
        return null;  // Fallback to null if there's any error
    }
}


export function updateUrlLang(lang) {
    const url = new URL(window.location.href); // Récupérer l'URL actuelle
    url.searchParams.set('lang', lang); // Modifier le paramètre "lang"
    window.history.pushState({}, '', url); // Mettre à jour l'URL sans recharger la page
}

export function changeLang(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    updateUrlLang(lang);
}