import { createMemoryHistory, createRouter } from 'vue-router'

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

import {COULEUR_MENU_BASIC, COULEUR_MENU_SELECTIONNE} from '../data/const.js';

const routes = [
  { 
    path: '/',
    name: 'home',
    component: home 
},{ 
    path: '/projects',
    name: 'projects',
    component: projects 
},{
    path: '/projects/portfolio',
    name: 'portfolio',
    component: project_portfolio
},{
    path: '/projects/marsinvaders',
    name: 'marsinvaders',
    component: project_sae101
},{
    path: '/projects/skillupnow',
    name: 'skillupnow',
    component: project_sae301
},{
    path: '/projects/project_sae104',
    name: 'amphibiens',
    component: project_sae104
},{
    path: '/projects/bmw',
    name: 'bmw',
    component: project_sae401
},{ 
    path: '/formations',
    name: 'formations',
    component: formations 
},{ 
    path: '/experience',
    name: 'experience',
    component: experience 
},{ 
    path: '/contact',
    name: 'contact',
    component: contact 
}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const menuItems = {
    home: "1",
    formations: "2",
    experience: "3",
    projects: "4",
    contact: "5"
};

function updateMenuStyle(menuItem, borderBottom, color) {
    $('nav ul li:nth-child(' + menuItem + ')').css('border-bottom', borderBottom);
    $('nav ul li:nth-child(' + menuItem + ') span').css('color', color);
}

router.beforeEach((to, from, next) => {
    const menuItem = menuItems[from.name] || "1";
    updateMenuStyle(menuItem, '0px', COULEUR_MENU_BASIC);
    next();
});

router.afterEach((to) => {
    const menuItem = menuItems[to.name] || "1";
    updateMenuStyle(menuItem, '2px solid ' + COULEUR_MENU_SELECTIONNE, COULEUR_MENU_SELECTIONNE);
});


export default router