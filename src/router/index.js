import { createWebHistory, createRouter } from "vue-router";

import { COULEUR_MENU_BASIC, COULEUR_MENU_SELECTIONNE } from "../data/const.js";
import { updateUrlLang } from "../utils/traduction.js";

import { useTitle } from "@vueuse/core";
import i18n from "../i18n.js";
const title = useTitle();

const routes = [
  { path: "/", name: "Accueil", component: () => import("../views/home-page.vue") },
  {
    path: "/interests/cooking",
    name: "Cuisine",
    component: () => import("../views/cooking-page.vue"),
  },
  {
    path: "/projects",
    name: "Projets",
    component: () => import("../views/projects-page.vue"),
  },
  {
    path: "/skillslist",
    name: "ReferentielCompetences",
    component: () => import("../views/referentiel-competences-page.vue"),
  },
  {
    path: "/skillsdisplay",
    name: "Competences",
    component: () => import("../views/skills_page.vue"),
  },
  {
    path: "/projects/portfolio",
    name: "Portfolio",
    component: () => import("../views/projects/project_portfolio.vue"),
  },
  {
    path: "/projects/marsinvaders",
    name: "Marsinvaders",
    component: () => import("../views/projects/project_sae101.vue"),
  },
  {
    path: "/projects/skillupnow",
    name: "Skillupnow",
    component: () => import("../views/projects/project_sae301.vue"),
  },
  {
    path: "/projects/amphibiens",
    name: "Amphibiens",
    component: () => import("../views/projects/project_sae104.vue"),
  },
  {
    path: "/projects/bmw",
    name: "BMW",
    component: () => import("../views/projects/project_sae401.vue"),
  },
  {
    path: "/projects/matinfo",
    name: "Matinfo",
    component: () => import("../views/projects/project_matinfo.vue"),
  },
  {
    path: "/projects/datacare",
    name: "Datacare",
    component: () => import("../views/projects/project_sae501.vue"),
  },

  {
    path: "/formations",
    name: "Formations",
    component: () => import("../views/parcours-page.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/contact-page.vue"),
  },
  {
    path: "/mesdonnees",
    name: "mesdonnees",
    component: () => import("../views/mydata-page.vue"),
  },
  {
    path: "/confidentialite",
    name: "Confidentialité",
    component: () => import("../views/confidentialite-page.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../components/Error/NotFound.vue"),
  },
];

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Définition des items du menu
const menuItems = {
  Accueil: "2",
  Formations: "3",
  Projets: "4",
  Competences: "5",
  ReferentielCompetences: "5",
  Contact: "6",
  Confidentialité: "0",
  "Mes données": "0",
  NotFound: "0",
  Cuisine: "0",
};

// Mis à jour du style du menu
function updateMenuStyle(menuItem, borderBottom, color) {
  // Vérifier que menuItem est un nombre entre 1 et 5
  if (menuItem > 0 && menuItem < 7) {
    document.querySelector(
      `#navContent a:nth-child(${menuItem})`,
    ).style.borderBottom = borderBottom;
    document.querySelector(`#navContent a:nth-child(${menuItem})`).style.color =
      color;
  }
}

router.beforeResolve((to, from, next) => {
  if (to.fullPath === from.fullPath && from.fullPath !== "/") {
    router.go(-1); // Retourner à la page précédente si la page actuelle est la même que la page précédente
  } else {
    try {
      next(); // Continuer la navigation normalement
    } catch (e) {
      console.error("Erreur lors de la navigation:", e);
      window.location.reload(); // Recharger la page si une erreur se produit
    }
  }
});

// Avant chaque changement de route
router.beforeEach((to, from, next) => {
  // Si menuItems est falsy (null ou false), 1 est utilisé par défaut
  const menuItem = menuItems[from.name] || menuItems["Projets"];
  updateMenuStyle(menuItem, "2px", COULEUR_MENU_BASIC);
  next();
});

// Après chaque changement de route
router.afterEach((to) => {
  const lang = localStorage.getItem("lang");
  updateUrlLang(lang);
  const menuItem = menuItems[to.name] || menuItems["Projets"];
  updateMenuStyle(
    menuItem,
    "2px solid " + COULEUR_MENU_SELECTIONNE,
    COULEUR_MENU_SELECTIONNE,
  );

  if (to.name == "NotFound") {
    title.value = i18n.global.t("notfound.pageTitle");
  } else {
    title.value = i18n.global.t("pages." + to.name);
  }
});

export default router;
