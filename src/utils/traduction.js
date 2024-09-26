
import { useNavigatorLanguage } from '@vueuse/core'
import { useI18n } from 'vue-i18n';  // Importer l'API i18n

export function traductionSetup(){
    const storedLang = localStorage.getItem('lang');
    const { language } = useNavigatorLanguage();
    const { locale } = useI18n();

    if (storedLang) {
        locale.value = storedLang;  // Initialize locale with stored language
    } else {
        localStorage.setItem('lang', language.value);  // Set browser language if no stored lang
        locale.value = language.value;
    }

    changeLang(locale.value);  // Update the language globally
}


export function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en';
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

