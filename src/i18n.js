import { createI18n } from 'vue-i18n';
import { getLangFromUrl } from '../src/utils/traduction';

// contact.js
const messages = {
  en: {
    message: {
      skills: 'Skills',
      search: 'Search: ',
      searchPlaceholder: 'Search for a skill or a category.',
      profilePicture: 'Léo Christophe, Developer: Profile Picture',
      contactGifTitle: 'Contact me if you have an internship offer or information to share.',

      month: 'month(s)',
      days: 'day(s)',

      homeTitle: 'Léo CHRISTOPHE',
      subtitle1: '3rd year bachelor computer science student',
      subtitle2: 'Based in Annecy, France',
      aboutTitle: 'About Me',
      aboutText: `A driven 3rd year bachelor computer science student with over 5 years of programming experience, 
                  constantly pushing the boundaries of innovation through diverse personal and professional projects. 
                  I infuse creativity into every challenge I tackle and my career goal is to become a lead software developer, 
                  specializing in game development, where I can combine my love for technology and creativity to craft 
                  immersive experiences that captivate users worldwide.`,
      viewCV: 'Resume ',
      contact: 'Contact me ',
      interestsTitle: 'My Interests',
      interestsDescription: 'What I enjoy doing outside of programming',
      
      animes: 'Anime',
      animesDescription: "I really enjoy Japanese animated works. I started watching anime in 2016 and since then, I’ve become a big fan of this type of content, especially isekai or comedic anime like Re:Zero.",
      videogames: 'Video Games',
      videogamesDescription: "I really like creative games like Minecraft. I've been playing for nearly 10 years and I still enjoy the genre as it continues to inspire me.",
      cooking: 'Cooking',
      cookingDescription: "I love cooking. From a young age, I've always enjoyed food, so being able to prepare it with my own personal touches is a real pleasure.",

      finishedProject: 'Finished Projects',
      finishedProjectsTitle: 'Counting all my projects, I have completed',
      yearsOfProgramming: 'Years of Programming',
      yearsOfProgrammingTitle: 'I have been programming for over 5 years',
      commits: 'Commits',
      commitsTitle: 'I have made over 450 commits on Github in the pasts years',
      masteredTech: 'Mastered Technologies',
      masteredTechTitle: 'In 4 diffent languages: PHP, JS, Python, C#. Frameworks: Flask, Blazor, VueJS, Laravel, ASP.NET Core, WPF and more... ',

      // HomeSkills
      skillsTitle: 'Hard skills',
      softskillsTitle: 'Soft skills',
      softskillsDescription: 'My interpersonal skills reflect my ability to interact well with others and adapt to situations. This includes communication, teamwork, time management and adaptability.',
      hardskillsDescription: "My technical skills are specific abilities I've gained through studies and professional experience. This includes, for example, proficiency in programming languages, database management, and network administration.",
      references: 'References',
      at: "at ",
      at_au: "at ",
      mobile: "Mob",

      // HomeContact
      homeContactTitle: 'Resume',
      homeContactDesc: 'I am currently looking for an end-of-study internship in web development, C# development, or video game development. The internship would take place between January 20, 2025 and May 1, 2025, for a maximum duration of 14 weeks.',

      CTA1: 'Do you have an internship offer or information to share with me? Feel free to',
      CTA2: ' contact me',
      CTA3: ' to discuss further!',

      btnDownload: 'Download resume',
      btnConsult: 'Consult resume',

      // Contact
      contactTitle: 'Contact Me',
      subtitle: 'Got a job offer? Want to share your thoughts?',
      nameLabel: 'Name',
      emailLabel: '*Email',
      example: "example",
      domain: "domain.com",
      emailDisclaimer: "Your email will only be used to recontact you.",
      formDisclaimer: "The first name is used solely for authentication purposes of the person (optional), and the email address is used for contact purposes. Each email is confidential between me and the person sending it and is directly archived and then deleted after reading. EmailJS is used to send email automatically and Recaptcha is used for security purposes.",
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
      experienceModalTitle: 'Job details:',   

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
      dateFilter_du: 'From',
      dateFilter_au: 'To',

      projectsSort: 'Sort by',
      projectsMostRecent: 'Most Recent',
      projectsOldest: 'Oldest',
      projectsLongest: 'Longest',
      projectsShortest: 'Shortest',

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
      education: 'Career Path',
      hobbies: 'Hobbies',
      translateHeaderDesc: "Switch to French",

      // Titre de fenetres
      Accueil: "Léo Christophe - Home",
      Formations: "Career",
      Projets: "Projects",
      Portfolio: "Portfolio",
      Marsinvaders: "Marsinvaders",
      Skillupnow: "SkillUpNow",
      Amphibiens: "Amphibians",
      ChrisConverter: "ChrisConverter",
      Matinfo: "Matinfo",
      BMW: "BMW",
      project_video: 'Silken Sweets',
      mesdonnees: "My data",
      Confidentialité: "Privacy",
      Contact: "Contact",
      Compétences: "Skills",

      // Footer
      personalData: 'Personal Data',
      contactInfo: 'Contact Information',
      readCV: 'Consult my CV',
      changeLang: 'Switch to french',
      name: 'Leo CHRISTOPHE',

      // Donnees
      etesVousSur: "Are you sure you want to delete all your data?",
      etesVousSurHeader: "Deleting your data",
      cancel: "No",
      delete: "Yes",
      infoData: "No data",
      deletedData: "Deleted data",
      succesToast: "Your data has been successfully deleted.",
      infoToast: "You have no data to delete.",

      donneesTitle: "Your data",
      donneesDisclaimer: `Your data stored on the browser is purely for ergonomic, translation purposes or to determine if you are a bot or not (Google Recaptcha). 
      They are not used for commercial or tracking purposes. For more details regarding your data, their use and deletion, please consult the `,

      donneesDisclaimer2: "You can delete optional (ergonomic) data at any time by clicking the button below.",
      donneesBtnSupp: "Delete my data",

      learnmore: "Learn more",
      link: "Link to ",

      notfound:{
        title: "404 - Page not found",
        message: "The page you are looking for does not exist.",
        home: "Back to home"
      },
    
      "cookieBanner":{
        "disclaimer":"This site uses cookies to improve your user experience. By continuing to browse this site, you accept the ",
        "privacypolicy":"privacy policy",
        "buttons":{
          "accept":"Accept",
          "refuse":"Refuse"
        }
      },

      "privacy": {
        "title": "Privacy Policy",
        "cookies": {
          "title": "Cookies",
          "intro": `
            This cookie policy explains what cookies are, 
            how they are used, how third-party services such as Google Recaptcha 
            may use cookies on this site, your choices regarding these cookies, 
            and additional information about their usage.`,
          "details": {
            "title": "Types of Cookies Used",
            "lang": {
              "name": "Cookie 'lang'",
              "description": "Used to manage the user's language preference. (Functional, Permanent)",
              "details": "This cookie is solely used to improve user experience by displaying the site in your preferred language."
            },
            "rc_a": {
              "name": "Cookie 'rc::a'",
              "description": "Required for the proper functioning of the captcha service (Google Recaptcha). (Essential, Permanent)",
              "details": "This cookie is used to distinguish between humans and bots, ensuring that only real users can interact with the contact form."
            },
            "rc_c": {
              "name": "Cookie 'rc::c'",
              "description": "Used for user sessions related to the captcha (Google Recaptcha). (Essential, Session)",
              "details": "This temporary cookie verifies that a real user is filling out the contact form and does not retain personal data beyond the session."
            },
            "filter_prefs": {
              "name": "Cookie 'filter_prefs'",
              "description": "Used to save filter preferences on the project page. (Functional, Permanent)",
              "details": "This cookie remembers your filter preferences to simplify navigation without collecting additional personal data."
            }
          }
        },
        "data_protection": {
          "title": "Data Protection",
          "content": `
            I am committed to protecting your personal data. The data collected via cookies or services  
            are exclusively used to enhance your user experience (language preferences, project filters) 
            ,to ensure the proper functioning of the contact form using Recaptcha V3 or to contact me via EmailJS.
            EmailJS is used to send each email directly to my email address and is archived and then deleted after reading.`
        },
        "user_rights": {
          "title": "User Rights",
          "content": `
            You have the right to access, rectify, or delete your data. 
            A dedicated page in the footer allows you to delete your data easily.`
        },
        "contact": {
          "title": "Contact",
          "content": `
            For any questions regarding this privacy policy or the use of cookies, 
            please contact me at {email}.`
        },
        "policy_update": {
          "title": "Policy Updates",
          "content": `
            This privacy policy may be updated periodically. 
            Any changes will be displayed here, with the date of the last update indicated at the top of this page.`
        }
      
      }
      
    }
  },
  fr: {
    message: {
      skills: 'Compétences',
      search: 'Rechercher: ',
      searchPlaceholder: 'Chercher par compétence ou domaine.',
      profilePicture: 'Léo Christophe, Développeur: Photo de profil',
      contactGifTitle: 'Contactez-moi si vous avez une proposition de stage ou des informations à me communiquer.',

      month: 'mois',
      days: 'jour(s)',
      homeTitle: 'Léo CHRISTOPHE',
      subtitle1: 'Étudiant en 3ème année de BUT Informatique',
      subtitle2: 'Localisé à Annecy, France',
      aboutTitle: 'À propos de moi',
      aboutText: `Étudiant de BUT Informatique, passionné de programmation depuis plus de 5 ans. J'ai affiné mes compétences à travers divers projets personnels et professionnels. Fan d'animés, de jeux vidéo et de cuisine, je mets ma créativité au service de chaque projet.`,
      viewCV: 'CV',
      contact: 'Me contacter',
      interestsTitle: 'Mes intérêts',
      interestsDescription: 'Ce que j\'aime faire en dehors de l\'informatique',

      btnDownload: 'Télécharger le CV',
      btnConsult: 'Consulter le CV',

      animes: 'Animés',
      animesDescription: "J\'aime beaucoup les oeuvres d'animations japonaises. J\'ai commencé à regarder des animes en 2016 et depuis, je suis devenu un grand fan de ce genre de contenu. Surtout les animes de type isekai ou comique comme Re:Zero.",
      videogames: 'Jeux-Vidéo',
      videogamesDescription: "J'aime beaucoup les jeux créatifs comme Minecraft. Jouant depuis près de 10 ans, le genre me plaît toujours autant en m'inspirant toujours.",
      cooking: 'Cuisine',
      cookingDescription:"J'adore cuisiner. Depuis mon plus jeune âge, j'ai toujours aimé la nourriture, alors pouvoir la confectionner avec mes propres touches est un vrai plaisir.",

      finishedProject: 'Projets Terminés',
      finishedProjectsTitle: 'En comptant tous les projets que j\'ai terminé',
      yearsOfProgramming: 'Années de Programmation',
      yearsOfProgrammingTitle: 'Je programme depuis plus de 5 ans',
      commits: 'Commits',
      commitsTitle: 'J\'ai effectué plus de 450 commits sur Github ces dernières années',
      masteredTech: 'Technologies maîtrisées',
      masteredTechTitle: 'Dans 4 langages différents: PHP, JS, Python, C#. Frameworks: Flask, Blazor, VueJS, Laravel, ASP.NET Core, WPF et plus...',


      // HomeSkills
      skillsTitle: 'Compétences techniques',
      softskillsTitle: 'Compétences interpersonnelles',
      softskillsDescription: "Capacités interpersonnelles et d'adaptation favorisant la collaboration et la gestion efficace. (Communication, travail en équipe, gestion du temps, adaptabilité...)",
      hardskillsDescription: "Compétences techniques spécifiques liées à l'exécution de tâches complexes dans un domaine précis. (maîtrise des langages de programmation, gestion de bases de données, administration de réseaux...)",
      references: 'Références',
      at: "à l'",
      at_au: "au",
      mobile: "Tel",
      
      // HomeContact
      homeContactTitle: 'CV',
      homeContactDesc: 'Je suis actuellement à la recherche d\'un stage de fin d\'études en développement web, développement C# ou développement de jeux-vidéos. Le stage se déroulerait entre le 20 Janvier 2025 et le 1er Mai 2025 pour une durée de 14 semaines maximum.',
      CTA1: 'Vous avez une offre de stage ou des informations à me communiquer ? N\'hésitez pas à ',
      CTA2: ' me contacter',
      CTA3: ' pour en discuter !',

      // Contact
      contactTitle: 'Contactez-moi',
      subtitle: "Vous avez une offre d\'emploi ? Vous voulez me faire part de vos remarques ?",
      nameLabel: 'Nom',
      emailLabel: '*Email',
      example: "exemple",
      domain: "domaine.com",
      emailDisclaimer: "Votre e-mail ne sera utiliser que pour vous recontacter.",
      formDisclaimer: "Le prénom sert uniquement à des fins d'authentifications de la personne (facultatif) et l'adresse-mail sert à des fins de contact. Chaque mail est confidentiel entre moi et la personne qui l'envoie et sont directement archivés puis supprimés après lecture. EmailJS est utilisé pour envoyer des mails automatiquement et Recaptcha est utilisé à des fins de sécurité.",
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
      experienceModalTitle: 'Détails de la mission:',   

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
      dateFilter_du: 'Du',
      dateFilter_au: 'au',

      projectsSort: 'Trier par',
      projectsMostRecent: 'Plus Récent',
      projectsOldest: 'Plus Ancien',
      projectsLongest: 'Le Plus Long',
      projectsShortest: 'Le Plus Court',

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
      education: 'Parcours',
      hobbies: 'Hobbies',
      translateHeaderDesc: "Passer en anglais",

      // Titre de fenetres
      Accueil: "Léo Christophe - Accueil",
      Formations: "Parcours",
      Projets: "Projets",
      Portfolio: "Portfolio",
      Marsinvaders: "Marsinvaders",
      Skillupnow: "SkillUpNow",
      Amphibiens: "Amphibiens",
      ChrisConverter: "ChrisConverter",
      Matinfo: "Matinfo",
      BMW: "BMW",
      project_video: 'Silken Sweets',
      mesdonnees: "Mes données",
      Confidentialité: "Confidentialité",
      Contact: "Contact",
      Compétences: "Compétences",

      // Footer
      personalData: 'Données personnelles',
      contactInfo: 'Informations de contact',
      readCV: 'Consulter mon CV',
      changeLang: 'Changer en anglais',
      name: 'Léo CHRISTOPHE',

      // Donnees
      etesVousSur: "Êtes-vous sûr de vouloir supprimer toutes vos données ?",
      etesVousSurHeader: "Suppression de vos données",
      cancel: "Non",
      delete: "Oui",
      infoData: "Aucune donnée",
      deletedData: "Données supprimées",
      succesToast: "Vos données ont été supprimé avec succès.",
      infoToast: "Vous n\'avez aucune donnée à supprimer.",

      donneesTitle: "Vos données",
      donneesDisclaimer: `Vos données stockées sur le navigateur ont un but purement ergonomique, 
                          de traduction ou pour savoir si vous être un robot ou non (Google Recaptcha). 
                          Elles ne sont pas utilisées à des fins commerciales ou de tracking. Pour plus
                          de détails concernant vos données, leur utilisation et leur suppression, veuillez
                          consulter la `,

      donneesDisclaimer2: "Vous pouvez effacer les données facultatives (ergonomiques) à tous moments en cliquant sur le bouton ci-dessous.",
      donneesBtnSupp:  "Supprimer mes données",

      learnmore: "En savoir plus",
      link: "Lien vers ",

      notfound:{
        title: "404 - Page inconnue",
        message: "La page que vous cherchez n'existe pas.",
        home: "Retour à l'accueil"
      },

      "cookieBanner":{
        "disclaimer":"Ce site utilise des cookies pour améliorer votre expérience utilisateur. En continuant à naviguer sur ce site, vous acceptez la ",
        "privacypolicy":"politique de confidentialité",
        "buttons":{
          "accept":"Accepter",
          "refuse":"Refuser"
        }
      },

      "privacy": {
        "title": "Politique de confidentialité",
        "cookies": {
          "title": "Cookies",
          "intro": `
            Cette politique de cookies explique ce que sont les cookies, 
            comment ils sont utilisés, comment des services tiers, comme Google Recaptcha, 
            peuvent les utiliser sur ce site, vos choix concernant ces cookies, 
            et des informations complémentaires sur leur usage.`,
          "details": {
            "title": "Types de cookies utilisés",
            "lang": {
              "name": "Cookie 'lang'",
              "description": "Utilisé pour gérer la préférence de langue de l'utilisateur. (Fonctionnel, Permanent)",
              "details": "Ce cookie est uniquement utilisé pour améliorer l'ergonomie et vous présenter le site dans la langue de votre choix."
            },
            "rc_a": {
              "name": "Cookie 'rc::a'",
              "description": "Nécessaire au fonctionnement du service de captcha (Google Recaptcha). (Nécessaire, Permanent)",
              "details": "Ce cookie est utilisé pour distinguer les humains des robots, assurant que seul un utilisateur réel puisse interagir avec le formulaire de contact."
            },
            "rc_c": {
              "name": "Cookie 'rc::c'",
              "description": "Utilisé pour les sessions utilisateurs concernant le captcha (Google Recaptcha). (Nécessaire, Session)",
              "details": "Ce cookie est temporaire et permet de vérifier qu'un utilisateur réel remplit le formulaire de contact, sans conserver d'informations personnelles au-delà de la session."
            }
          }
        },
        "data_protection": {
          "title": "Protection des données",
          "content": `
            Je suis engagé à protéger vos données personnelles. Les données collectées par les cookies 
            sont exclusivement utilisées pour améliorer votre expérience utilisateur (préférences de langue, filtres de projets) 
            ,pour assurer le bon fonctionnement du formulaire de contact avec Recaptcha V3 ou pour l'envoi de mail automatique à 
            partir du formulaire de contact. Ce formulaire de contact envoie chaque mail directement à mon adresse mail et est
            archivé puis supprimé après lecture.`
        },
        "user_rights": {
          "title": "Droits des utilisateurs",
          "content": `
            Vous avez le droit d'accéder à vos données, de les rectifier ou de les supprimer. 
            Une page dédiée dans le pied de page vous permet de supprimer vos données en toute simplicité.`
        },
        "contact": {
          "title": "Contact",
          "content": `
            Pour toute question concernant cette politique de confidentialité ou l'utilisation des cookies, 
            veuillez me contacter à {email}.`
        },
        "policy_update": {
          "title": "Mise à jour de la politique",
          "content": `
            Cette politique de confidentialité peut être mise à jour périodiquement. 
            Toute modification sera affichée ici, avec la date de la dernière mise à jour indiquée en haut de cette page.`
        }
      
      }
      
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
