import { createI18n } from 'vue-i18n';
import { getLangFromUrl } from '../src/utils/traduction';
import en from '../src/data/en.json';
import fr from '../src/data/fr.json';


const messages = {
  en:en,
  fr:fr
};


const i18n = createI18n({
  locale: getLangFromUrl(),
  fallbackLocale: 'fr',
  globalInjection: true,
  messages
});


export default i18n;
