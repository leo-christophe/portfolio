import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

createApp(App)
  .use(router)
  .use(PrimeVue)
  .mount('#app')
