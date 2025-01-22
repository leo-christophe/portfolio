<script setup>
import Portfolio from '../../components/ProjectTemplate.vue'
</script>

<template>
    <div>
        <Portfolio id="3"/>
    </div>
    
    
    <div class="project_title_container">
        <h2>{{$t('projects.details')}}</h2>
    </div>  

    <section>
        <div class="project_title_container">
            <h3>{{$t('projects.portfolio.api_use_title')}}</h3>
        </div>  

        <article>
            <span class="sectionText">
                <div class="project_title_container">
                    <h4>{{$t('projects.portfolio.email_js')}}</h4>
                </div>
                <p>{{$t('projects.portfolio.email_js_details')}}<a href="https://www.emailjs.com/" target="_blank">{{ $t("projects.portfolio.email_js") }}</a> {{$t('projects.portfolio.email_js_end')}}</p>
                </span>
            <img class="projectImg" src="/images/projects/emailjs.webp" alt="EmailJS">
        </article>

        <article>
            <span class="sectionText">
                <div class="project_title_container">
                    <h4>{{$t('projects.portfolio.google_recaptcha')}}</h4>
                </div>
                <p>{{$t('projects.portfolio.google_recaptcha_details')}}</p>
                </span>
            <img class="projectImg" src="/images/projects/recaptcha.webp" alt="Google Recaptcha">
        </article>
    </section>

    <section>
        <div class="project_title_container">
            <h3>{{$t('projects.portfolio.rgpd')}}</h3>
        </div>
        <p>
            {{$t('projects.portfolio.rgpd_details')}} <a href="/confidentialite" target="_blank">{{ $t('pages.Confidentialité') }}</a> {{$t('projects.portfolio.rgpd_end')}})
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