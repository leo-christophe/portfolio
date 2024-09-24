import { createWebHistory, createRouter } from 'vue-router'

import home from '../views/home.vue';
import projects from '../views/projects.vue';
import formations from '../views/formations.vue';
import experience from '../views/experience.vue';
import contact from '../views/contact.vue';

import project_portfolio from '../views/projects/project_portfolio.vue';
import project_sae101 from '../views/projects/project_sae101.vue';
import project_sae104 from '../views/projects/project_sae104.vue';
import project_sae301 from '../views/projects/project_sae301.vue';
import project_sae401 from '../views/projects/project_sae401.vue';
import project_video from '../views/projects/project_video.vue';


import NotFound from '../components/Error/NotFound.vue';
import dataPage from '../views/mesdonnees.vue';

import {COULEUR_MENU_BASIC, COULEUR_MENU_SELECTIONNE} from '../data/const.js';
import mesdonnees from '../views/mesdonnees.vue';

import { useTitle } from '@vueuse/core'

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
    name: 'Vidéo Silken Sweets',
    component: project_video
},{ 
    path: '/formations',
    name: 'Formations',
    component: formations,
    alias: '/etudes' 
},{ 
    path: '/experience',
    name: 'Experience',
    component: experience 
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
    name: 'Mes données',
    component: mesdonnees
  }
]

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Définition des items du menu
const menuItems = {
    Accueil: "1",
    Formations: "2",
    Experience: "3",
    Projets: "4",
    Portfolio: "4",
    Marsinvaders: "4",
    Skillupnow: "4",
    Amphibiens: "4",
    BMW: "4",
    project_video: '4',
    'Mes données': "0",
    Contact: "5"
  };

// Mis à jour du style du menu
function updateMenuStyle(menuItem, borderBottom, color) {
    $('nav ul li:nth-child(' + menuItem + ')').css('border-bottom', borderBottom);
    $('nav ul li:nth-child(' + menuItem + ') span').css('color', color);
}

// Avant chaque changement de route
router.beforeEach((to, from, next) => {
    // Si menuItems est falsy (null ou false), 1 est utilisé par défaut
    const menuItem = menuItems[from.name] || "1";
    updateMenuStyle(menuItem, '0px', COULEUR_MENU_BASIC);
    next();
});

// Après chaque changement de route
router.afterEach((to) => {
    const menuItem = menuItems[to.name] || "1";
    updateMenuStyle(menuItem, '2px solid ' + COULEUR_MENU_SELECTIONNE, COULEUR_MENU_SELECTIONNE);
    title.value = to.name;
});


export default router