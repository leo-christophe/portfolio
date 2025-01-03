<script setup>
import Portfolio from '../../components/ProjectTemplate.vue'
</script>

<template>
    <div>
        <Portfolio id="3"/>
    </div>
    
    
    <div class="project_title_container">
        <h2>Details</h2>
    </div>  

    <section>
        <div class="project_title_container">
            <h3>Utilisation d'API</h3>
        </div>  

        <article>
            <span class="sectionText">
                <div class="project_title_container">
                    <h4>EmailJS</h4>
                </div>
                <p>Utilisation de l'API du service <a href="https://www.emailjs.com/" target="_blank">emailJS</a> pour récupérer le formulaire de contact. Le formulaire a besoin de la validation Google Recaptcha pour fonctionner. Si l'utilisateur est confirmé humain, les données du formulaire sont envoyées à EmailJS qui envoie un mail dans ma boîte mail.</p>
                </span>
            <img class="projectImg" src="/images/projects/emailjs.webp" alt="EmailJS">
        </article>

        <article>
            <span class="sectionText">
                <div class="project_title_container">
                    <h4>Google Recaptcha 3</h4>
                </div>
                <p>Utilisation de l'API de Google Recaptcha 3 pour vérifier si l'utilisateur est un robot pour protéger le formulaire de contact. Google Recaptcha fonctionne sans vérification de l'utilisateur directe mais d'une façon indirecte, selon ses actions lors de l'utilisation du site.</p>
                </span>
            <img class="projectImg" src="/images/projects/recaptcha.webp" alt="Google Recaptcha">
        </article>
    </section>

    <section>
        <div class="project_title_container">
            <h3>RGPD</h3>
        </div>
        <p>
            Bien que le site soit un portfolio, l'utilisation d'un système de traduction et d'un système de vérification de véracité de l'utilisateur révèlent l'utilisation de cookies. Ainsi, conformement aux règlementations européennes en vigueur (03/11/2025), le site est conforme à la réglementation RGPD. Les données personnelles sont protégées et les cookies sont utilisés de manière transparente. (Voir la page <a href="/confidentialite" target="_blank">politique de confidentialité</a> pour plus d'informations)
        </p>
    </section>
</template>

<style scoped>
div.project_title_container h2{
    display:flex;
    justify-content: center;
}

div.project_title_container h3{
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top:10vh;
}

section, article{
    width:50vw;
    align-items: center;
    margin: 30px auto;
    display:flex;
    flex-direction: column;
    gap:5%;
}

article:nth-child(even){
    flex-direction: row;
}

article:nth-child(odd){
    flex-direction: row-reverse;
}

img.projectImg{
    width: 200px;
    height: auto;
    margin: 0 auto;
}

img[src="/images/projects/recaptcha.webp"]{
    width: 100px;
}
</style>