import { createI18n } from 'vue-i18n';
import { getLangFromUrl } from '../src/utils/traduction';

// contact.js
const messages = {
  en: {
    message: {
      hello: 'Hello world',
      homeTitle: 'Léo CHRISTOPHE',
      subtitle1: '3rd year computer science student',
      subtitle2: 'Based in Annecy, France',
      aboutTitle: 'About Me',
      aboutText: `BUT Computer Science student with an undeniable passion for programming for over 5 years.
                  I have significantly developed my skills through personal and professional projects.
                  I am passionate about anime, video games, and cooking.`,
      viewCV: 'Curriculum Vitae',
      contact: 'Contact me',

      // HomeSkills
      skillsTitle: 'Hard skills',
      softskillsTitle: 'Soft skills',
      softskillsDescription: 'My interpersonal skills reflect my ability to interact well with others and adapt to situations. This includes communication, teamwork, time management, and adaptability.',
      hardskillsDescription: "My technical skills are specific abilities I've gained through studies and professional experience. This includes, for example, proficiency in programming languages, database management, and network administration.",
      references: 'References',
      at: "at ",
      mobile: "Mob",

      // HomeContact
      homeContactTitle: 'Resume',
      CTA1: 'Convinced ?',
      CTA2: ' Contact me',
      CTA3: ' now!',

      // Contact
      contactTitle: 'Contact Me',
      subtitle: 'Got a job offer? Want to share your thoughts?',
      contactTitle: 'Contact Me',
      nameLabel: 'Name',
      emailLabel: '*Email',
      example: "example",
      domain: "domain.com",
      emailDisclaimer: "Your email will only be used to recontact you.",
      formDisclaimer: "The first name is used solely for authentication purposes of the person (optional), and the email address is used for contact purposes. Each email is confidential between me and the person sending it and is directly archived and then deleted after reading.",
      messageLabel: 'Message',
      submitButton: 'Send',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Try again or contact me directly.',
      emailSectionTitle: 'University Email Address:',
      phoneSectionTitle: 'Phone Number:',
      availability: 'Available from 1 PM to 2 PM and from 7 PM to 8 PM.',
      contactButton: 'Contact Me',
      callButton: 'Call',
      smsButton: 'Send SMS',
      copyMessage: 'Text copied to clipboard.',
      copySummary: 'Copied',
      copyTitle: 'Copy text to clipboard',
      success: 'Success',
      error:'Error',
      locationTitle: 'Location',
      localisationDescription: 'Located between mountains and lakes, in the beautiful department of Haute-Savoie.',
      currentAddress: 'Current Address:',
      permanentAddress: 'Permanent Address:',
      region: 'Haute-Savoie, France',

      // Formations
      educationTitle: 'Education',
      educationSubtitle: 'My academic background',

      // Experience
      experienceTitle: 'Experience',
      experienceSubtitle: 'My professional experiences',
      experienceCompetenceTitle: 'Mobilized skills',
      experienceMissionsTitle: 'Missions',
      experienceOngoing: 'Ongoing',    

      // Projects
      projectsTitle: 'Projects',
      projectsDateLabel: 'Date',
      projectsKeywordsLabel: 'Keywords',
      projectsFiltersKeyword: 'Filter',
      projectsFiltersKeywordTitle: 'Keywords to sort projects using the Levenshtein algorithm',
      projectsTypeLabel: 'Project type',
      projectsTypePersonal: 'Personal',
      projectsTypePersonalTitle: 'Personal projects are projects that I have developed on my own.',
      projectsTypeUniversity: 'University',
      projectsTypeUniversityTitle: 'Academic projects are projects that I have developed as part of my studies.',
      projectsOnGoing: 'Ongoing',

      projectsInvalidDate: 'Please, enter valid dates.',
      projectsDateError: 'The end date must be greater than the start date.',
      projectsNotFound: 'No project was found corresponding to your search.',

      // Project Template
      projectLastImage: 'Last image',
      projectNextImage: 'Next image',
      projectRealisationsMissionsTitle: 'Realizations and missions',
      mobilizedSkills: 'Mobilized skills',

      // Navigation
      home: 'Home',
      contact: 'Contact',
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      hobbies: 'Hobbies',

      // Footer
      personalData: 'Personal Data',
      contactInfo: 'Contact Information',
      readCV: 'Consult my CV',
      changeLang: 'Switch to french',
      name: 'Leo CHRISTOPHE',
    }
  },
  fr: {
    message: {
      // Home
      hello: 'Bonjour le monde',
      homeTitle: 'Léo CHRISTOPHE',
      subtitle1: 'Étudiant en 3ème année de BUT Informatique',
      subtitle2: 'Localisé à Annecy, France',
      aboutTitle: 'À propos de moi',
      aboutText: `Étudiant de BUT Informatique avec une passion idéniable pour la programmation depuis plus de 5 ans. J'ai développé énormément mes compétences lors de la réalisation de projets personnels et professionnels. Je suis passionné par les animés, les jeux-vidéo et la cuisine.`,
      viewCV: 'Curriculum Vitae',
      contact: 'Me contacter',

      // HomeSkills
      skillsTitle: 'Compétences techniques',
      softskillsTitle: 'Compétences interpersonnelles',
      softskillsDescription: "Mes compétences comportementales reflètent ma capacité à bien interagir avec les autres et à m'adapter aux situations. Cela comprend la communication, le travail en équipe, la gestion du temps et l'adaptabilité.",
      hardskillsDescription: "Mes compétences techniques sont des aptitudes précises que j'ai acquises grâce à mes études et expériences professionnelles. Cela inclut, par exemple, la maîtrise des langages de programmation, la gestion de bases de données et l'administration de réseaux.",
      references: 'Références',
      at: "à l'",
      mobile: "Tel",
      
      // HomeContact
      homeContactTitle: 'Curriculum Vitae',
      CTA1: 'Convaincu ?',
      CTA2: ' Contactez-moi',
      CTA3: ' dès-maintenant !',

      // Contact
      contactTitle: 'Contactez-moi',
      subtitle: "Vous avez une offre d\'emploi ? Vous voulez me faire part de vos remarques ?",
      contactTitle: 'Contactez-moi',
      nameLabel: 'Nom',
      emailLabel: '*Email',
      example: "exemple",
      domain: "domaine.com",
      emailDisclaimer: "Votre e-mail ne sera utiliser que pour vous recontacter.",
      formDisclaimer: "Le prénom sert uniquement à des fins d'authentifications de la personne (facultatif) et l'adresse-mail sert à des fins de contact. Chaque mail est confidentiel entre moi et la personne qui l'envoie et sont directement archivés puis supprimés après lecture.",
      messageLabel: 'Message',
      submitButton: 'Envoyer',
      successMessage: 'Message envoyé avec succès!',
      errorMessage: 'Réessayez ou contactez-moi directement.',
      emailSectionTitle: 'Adresse mail universitaire:',
      phoneSectionTitle: 'Numéro de téléphone:',
      availability: 'Disponible de 13h à 14h et de 19h à 20h.',
      contactButton: 'Me Contacter',
      callButton: 'Appeler',
      smsButton: 'Envoyer un SMS',
      copyMessage: 'Texte copié dans le presse-papier.',
      copyTitle: 'Copier le texte dans le presse-papier',
      copySummary: 'Copié',
      success: 'Succès',
      error:'Erreur',
      locationTitle: 'Localisation',
      localisationDescription: 'Localisé entre montagnes et lacs, dans le magnifique département de la Haute-Savoie.',
      currentAddress: 'Adresse actuelle:',
      permanentAddress: 'Adresse fixe:',
      region: 'Haute-Savoie, France',

      // Formations
      educationTitle: 'Formations',
      educationSubtitle: 'Mon parcours académique',

      // Experience
      experienceTitle: 'Expériences',
      experienceSubtitle: 'Mes expériences professionnelles',
      experienceCompetenceTitle: 'Compétences mobilisées',
      experienceMissionsTitle: 'Missions',

      // Projects
      projectsTitle: 'Projets',
      projectsDateLabel: 'Date',
      projectsKeywordsLabel: 'Mots-clés',
      projectsFiltersKeyword: 'Filtrer',
      projectsFiltersKeywordTitle: 'Mots-clés pour trier les projets en utilisant l\'algorithme de Levenshtein',
      projectsTypeLabel: 'Type de projet',
      projectsTypePersonal: 'Personnel',
      projectsTypePersonalTitle: 'Les projets personnels sont des projets que j\'ai développés moi-même.',
      projectsTypeUniversity: 'Universitaire',
      projectsTypeUniversityTitle: 'Les projets académiques sont des projets que j\'ai développés dans le cadre de mes études.',
      projectsOnGoing: 'En cours',

      projectsInvalidDate: 'Veuillez entrer des dates valides.',
      projectsDateError: 'La date de fin doit être supérieure à la date de début.',
      projectsNotFound: 'Aucun projet correspondant à votre recherche n\'a été trouvé.',

      // Project Template
      projectLastImage: 'Dernière image',
      projectNextImage: 'Image suivante',
      projectRealisationsMissionsTitle: 'Réalisations et missions',
      mobilizedSkills: 'Compétences mobilisées',

      // Navigation
      home: 'Accueil',
      contact: 'Contact',
      projects: 'Projets',
      experience: 'Experience',
      education: 'Formations',
      hobbies: 'Hobbies',

      // Footer
      personalData: 'Données personnelles',
      contactInfo: 'Informations de contact',
      readCV: 'Consulter mon CV',
      changeLang: 'Changer en anglais',
      name: 'Léo CHRISTOPHE',
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
