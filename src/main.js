import { createApp } from 'vue'
// Feuille de style globale et application
import './style.css'
import App from './App.vue'

// Librairies externes
import router from './router/index'
import PrimeVue from 'primevue/config'
import { VueRecaptchaPlugin } from 'vue-recaptcha/head'

// Prime vue Themes et icones
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

// Services
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

// Directives
//import scrollDirective from './directives/scroll-directive.js';

createApp(App)
  // Vue-Router
  .use(router)
  // Vue-recaptcha
  .use(VueRecaptchaPlugin, {
      v3SiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    })
  // PrimeVue
  .use(PrimeVue)
  .use(ToastService)
  .use(ConfirmationService)
  // Directives
  //.directive('scroll', scrollDirective)

  .mount('#app')
