import { createMemoryHistory, createRouter } from 'vue-router'

import home from '../views/home.vue';
import projects from '../views/projects.vue';
import hobbies from '../views/hobbies.vue';
import formations from '../views/formations.vue';
import experience from '../views/experience.vue';

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
    path: '/hobbies',
    name: 'hobbies',
    component: hobbies 
},{ 
    path: '/formations',
    name: 'formations',
    component: formations 
},{ 
    path: '/experience',
    name: 'experience',
    component: experience 
},
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router