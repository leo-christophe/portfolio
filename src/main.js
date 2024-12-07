import { createApp } from 'vue'
// Feuille de style globale et application
import './style.css'
import App from './App.vue'

// Librairies externes
import router from './router/index'
import PrimeVue from 'primevue/config'
import i18n from './i18n'
import { VueRecaptchaPlugin } from 'vue-recaptcha/head'

// Prime vue Themes et icones
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

// Services
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

// Directives
//import scrollDirective from './directives/scroll-directive.js';
import Tooltip from 'primevue/tooltip';

// Données
import dataPlugin from './utils/dataPlugin'

const apiKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

createApp(App)
  // Vue-Router
  .use(router)
  // Vue-recaptcha
  .use(VueRecaptchaPlugin, {
      v3SiteKey: apiKey, // Your v3 Site Key 
    })
  // PrimeVue
  .use(PrimeVue, {
    locale: {
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      today: 'Aujourd\'hui',
      clear: 'Effacer',
      weekHeader: 'Semaine',
      firstDayOfWeek: 0,
      dateFormat: 'dd/mm/yy',
    }
  })
  .use(ToastService)
  .use(ConfirmationService)

  // Directives
  //.directive('scroll', scrollDirective)
    .directive('tooltip', Tooltip)
  // i18n
  .use(i18n)
  // Données
  .use(dataPlugin)
  .mount('#app')
