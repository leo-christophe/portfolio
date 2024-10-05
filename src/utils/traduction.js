import { useNavigatorLanguage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';  // Importer l'API i18n

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

        console.log("Localstorage: ", storedLang, "Navigator: ", language.value, "URL: ", urlLang, "Current: ", currentLang);

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
        const lang = params.get('lang');
        return lang ? lang.substring(0, 2) : 'fr';  // Extract base lang (e.g., "fr" from "fr-FR")
    } catch (error) {
        console.error('Error parsing URL parameters:', error);
        return null;  // Fallback to null if there's any error
    }
}

export function updateUrlLang(lang) {
    const url = new URL(window.location.href);  // Get the current URL
    url.searchParams.set('lang', lang);  // Set the "lang" parameter
    window.history.pushState({}, '', url);  // Update the URL without reloading the page
}

export function changeLang(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    updateUrlLang(lang);
}
