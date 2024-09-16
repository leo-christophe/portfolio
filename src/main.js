import { createApp } from 'vue'
// Feuille de style globale et application
import './style.css'
import App from './App.vue'

// Librairies externes
import router from './router/index'
import PrimeVue from 'primevue/config'

// Prime vue Themes et icones
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

// Services
import ToastService from 'primevue/toastservice';

// Directives
//import scrollDirective from './directives/scroll-directive.js';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  //.directive('scroll', scrollDirective)
  .mount('#app')
