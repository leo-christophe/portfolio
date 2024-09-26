import { createI18n } from 'vue-i18n';
import { getLangFromUrl } from '../src/utils/traduction';

const messages = {
  en: {
    message: {
      title: 'Léo CHRISTOPHE',
      subtitle1: '3rd year computer science student',
      subtitle2: 'Based in Annecy, France',
      aboutTitle: 'About Me',
      aboutText: `BUT Computer Science student with an undeniable passion for programming for over 5 years.
                  I have significantly developed my skills through personal and professional projects.
                  I am passionate about anime, video games, and cooking.`,
      viewCV: 'Curriculum Vitae',
      contact: 'Contact me',
    }
  },
  fr: {
    message: {
      title: 'Léo CHRISTOPHE',
      subtitle1: 'Étudiant en 3ème année de BUT Informatique',
      subtitle2: 'Localisé à Annecy, France',
      aboutTitle: 'À propos de moi',
      aboutText: `Étudiant de BUT Informatique avec une passion idéniable pour la programmation depuis plus de 5 ans.
                  J'ai développé énormément mes compétences lors de la réalisation de projets personnels et professionnels.
                  Je suis passionné par les animés, les jeux-vidéo et la cuisine.`,
      viewCV: 'Curriculum Vitae',
      contact: 'Me contacter',
    }
  }
};

const i18n = createI18n({
  locale: getLangFromUrl(), // Use language from URL
  fallbackLocale: 'fr', // Default fallback language
  globalInjection: true, // Inject globally so all components can access the locale
  messages
});


export default i18n;
