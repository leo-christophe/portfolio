import { ref } from "vue";

/**
 *  COULEURS ET DIMENSIONS
 */
export const COULEUR_MENU_SELECTIONNE = "RGB(159, 229, 227)";
export const COULEUR_MENU_BASIC = "white";
export const MOBILE_WIDTH = "480px";
export const TIMELINE_STYLE = {
  "--p-timeline-event-min-height": "10vh",
  "--p-timeline-horizontal-event-content-padding": "10px",
  "--p-timeline-vertical-event-content-padding": "5px",
  "--p-timeline-event-marker-size": "24px",
  "--p-timeline-event-marker-border-radius": "50%",
  "--p-timeline-event-marker-border-width": "3px",
  "--p-timeline-event-marker-background": "black",
  "--p-timeline-event-marker-border-color": "white",
  "--p-timeline-event-marker-content-border-radius": "4px",
  "--p-timeline-event-marker-content-size": "16px",
  "--p-timeline-event-marker-content-background": "white",
  "--p-timeline-event-marker-content-inset-shadow": "none",
  "--p-timeline-event-connector-color": "black",
  "--p-timeline-event-connector-size": "2px",
};

/**
 *  LIENS ET CHEMINS
 */
export const GITHUB_ICON = "";
export const LINKEDIN_ICON = "";
export const INTERNET_ICON = "";
export const CV_NAME_WEB = "LEO-CHRISTOPHE-CV-2025.pdf";
export const CV_NAME_WEB_EN = "LEO-CHRISTOPHE-CV_2025_ENGLISH.pdf";
export const hardSkillsImages = [
  // 1 - Développement Web
  [
    "Javascript.webp",
    "Laravel.webp",
    "Nuxt.webp",
    "PHP.webp",
    "Vite.webp",
    "Blazor.webp",
    "Flask.webp",
  ],

  // 2 - Développement Logiciel ou Jeux
  [
    "CSharp.webp",
    "Dotnet.webp",
    "Windev.webp",
    "Unity.webp",
    "WinUI.webp",
    "WPF.webp",
  ],

  // 3 - Analyse et Gestion des Données
  [
    "Grafana.webp",
    "InfluxDB.svg",
    "MySQL.webp",
    "PostgreSQL.webp",
    "PowerBI.webp",
  ],

  // 4 - Déploiement & DevOps
  [
    "Azure.webp",
    "Github.webp",
    "Gitlab.webp",
    "Vercel.webp",
    "VirtualBox.webp",
    "Linux.webp",
  ],
];

/**
 * ICONES
 */
export const hardSkillsIcons = ref([
  "pi pi-globe",
  "pi pi-desktop",
  "pi pi-database",
  "pi pi-sitemap",
]);

/**
 *  DONNEES PERSONNELLES DYNAMIQUES
 */
export const EMAIL = "leo.christophe@etu.univ-savoie.fr";
export const MOBILE = "+33 07 82 42 44 96";

/**
 *  DONNEES PORTFOLIO
 */
export const SUPPORTED_LANGUAGES = ["fr", "en"];
export const DEFAULT_LANGUAGE = "fr";
