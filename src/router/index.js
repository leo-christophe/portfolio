import { createWebHistory, createRouter } from 'vue-router'

import home from '../views/home.vue';
import projects from '../views/projects.vue';
import formation from '../views/parcours.vue';
import contact from '../views/contact.vue';
import skills from '../views/skills.vue';

import project_portfolio from '../views/projects/project_portfolio.vue';
import project_sae101 from '../views/projects/project_sae101.vue';
import project_sae104 from '../views/projects/project_sae104.vue';
import project_sae301 from '../views/projects/project_sae301.vue';
import project_sae401 from '../views/projects/project_sae401.vue';
import project_video from '../views/projects/project_video.vue';
import project_converter from '../views/projects/project_chrisconverter.vue';
import project_matinfo from '../views/projects/project_matinfo.vue';

import NotFound from '../components/Error/NotFound.vue';
import mesdonnees from '../views/mesdonnees.vue';
import confidentialite from '../views/confidentialite.vue';

import {COULEUR_MENU_BASIC, COULEUR_MENU_SELECTIONNE} from '../data/const.js';
import { updateUrlLang } from '../utils/traduction.js';

import { useTitle } from '@vueuse/core'
import i18n from '../i18n.js';

const title = useTitle()

// Définition des routes
const routes = [
  { 
    path: '/',
    name: 'Accueil',
    component: home,
    alias: '/home'
},{ 
    path: '/projects',
    name: 'Projets',
    component: projects,
    alias: '/projets'
},{
    path:'/skills',
    name: 'Compétences',
    component: skills,
    alias: '/competences'
},{
    path: '/projects/portfolio',
    name: 'Portfolio',
    component: project_portfolio,
    alias: '/projets/portfolio'
},{
    path: '/projects/marsinvaders',
    name: 'Marsinvaders',
    component: project_sae101,
    alias: '/projets/marsinvaders'
},{
    path: '/projects/skillupnow',
    name: 'Skillupnow',
    component: project_sae301,
    alias: '/projets/skillupnow'
},{
    path: '/projects/project_sae104',
    name: 'Amphibiens',
    component: project_sae104,
    alias: '/projets/amphibiens'
},{
    path: '/projects/bmw',
    name: 'BMW',
    component: project_sae401,
    alias: '/projets/bmw'
},{
    path: '/projects/video_silkensweets',
    name: 'project_video',
    component: project_video
},{
    path: '/projects/chrisconverter',
    name: 'ChrisConverter',
    component: project_converter
},{
    path: '/projects/matinfo',
    name: 'Matinfo',
    component: project_matinfo
},{ 
    path: '/formations',
    name: 'Formations',
    component: formation,
    alias: '/etudes' 
},{ 
    path: '/contact',
    name: 'Contact',
    component: contact 
},{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },{
    path: '/mesdonnees',
    name: 'mesdonnees',
    component: mesdonnees
  },{
    path: '/confidentialite',
    name: 'Confidentialité',
    component: confidentialite
  }
]

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Définition des items du menu
const menuItems = {
    Accueil: "2",
    Formations: "3",
    Projets: "4",
    Portfolio: "4",
    Marsinvaders: "4",
    Skillupnow: "4",
    Amphibiens: "4",
    ChrisConverter: "4",
    Matinfo: "4",
    BMW: "4",
    project_video: '4',
    'Mes données': "4",
    'Confidentialité': "0",
    Contact: "5",
    Competences: "0"
  };

// Mis à jour du style du menu
function updateMenuStyle(menuItem, borderBottom, color) {
    // Vérifier que menuItem est un nombre entre 1 et 5
    if (menuItem > 0 && menuItem < 6) {
        document.querySelector(`#navContent a:nth-child(${menuItem})`).style.borderBottom = borderBottom;
        document.querySelector(`#navContent a:nth-child(${menuItem})`).style.color = color;
    }
}

router.beforeResolve((to, from, next) => {
    
    if (to.fullPath === from.fullPath && from.fullPath !== '/') {
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
    const menuItem = menuItems[from.name] || menuItems['Accueil'];
    updateMenuStyle(menuItem, '2px', COULEUR_MENU_BASIC);
    next();
});

// Après chaque changement de route
router.afterEach((to) => {
    const lang = localStorage.getItem('lang');
    updateUrlLang(lang);
    const menuItem = menuItems[to.name] || menuItems['Accueil'];
    updateMenuStyle(menuItem, '2px solid ' + COULEUR_MENU_SELECTIONNE, COULEUR_MENU_SELECTIONNE);

    title.value = i18n.global.t('message.'+to.name);
});


export default router