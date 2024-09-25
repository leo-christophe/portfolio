
import { useNavigatorLanguage } from '@vueuse/core'

export function traductionSetup(){
    // Gestion des langues
    const lang = localStorage.getItem('lang');
    const { language } = useNavigatorLanguage()

    if (lang === null) {
      localStorage.setItem('lang', language.value);
    }

    changeLang(language.value)
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

