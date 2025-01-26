import { ref } from "vue";

/**
 * @description Gères la visibilité des conteneurs de la page de compétences
 * @param {float} treshold Pourcentage à partir duquel l'objet devient visible
 * @param {string} classConteneur Conteneur dont on veut rajouter la gestion de la visibilité
 * @param {string} classVisible Nom de la classe définissant le conteneur comme visible
 */
export function gestionVisibilite(treshold=0.3, classConteneur=".skillsContainer", classVisible="show") {
    const containers = document.querySelectorAll(classConteneur);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(classVisible);
        } else {
          entry.target.classList.remove(classVisible);
        }
      });
    }, { threshold: treshold });

    containers.forEach(container => {
      observer.observe(container);
    });
}

/**
 * @description Observer pour les barres de compétences
 */
const observer = ref(null);
/**
 * @description Gères la visibilité des barres de compétences
 */
export const vSkillBar = {
    mounted(el) {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const bar = entry.target;
          if (entry.isIntersecting) {
            const width = bar.getAttribute('data-skill');
            bar.style.width = width;
          } else {
            bar.style.width = '0%';
          }
        });
      }, { threshold: 0.5 });

      observer.value.observe(el);
    },
    unmounted(el) {
      if (observer.value){
        observer.value.unobserve(el);
      }
    }
  };

/**
 * @description Gères la responsivité du carousel de compétences
 */
export const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 3
  },
  {
    breakpoint: '1200px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '867px',
    numVisible: 1,
    numScroll: 1
  }
]);

export const animateLangues = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const container = entry.target;
        const langItems = container.querySelectorAll('#langsSectionContainer > div');
        
        if (entry.isIntersecting) {
          // Réinitialise l'état avant l'animation
          langItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
          });
          
          // Déclenche l'animation avec délai
          langItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 200);
          });
        } else {
          // Réinitialise quand la section quitte la vue
          langItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
          });
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' 
    });
  
    const container = document.querySelector('#langsContainer');
    if (container) observer.observe(container);
  };