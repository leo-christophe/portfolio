<script setup>
// Vue
import { reactive, ref, onMounted } from 'vue';

// Components
import { sendMail_asClient, callNumber_asClient, sendSMS_asClient } from '../utils/contact_client'; 
import { MOBILE, EMAIL } from '../data/const.js';

// Libs
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';

import { useVibrate } from '@vueuse/core';

// Using toast for notifications
const toast = useToast();
const { vibrate, stop, isSupported } = useVibrate({ pattern: [300] })

// Reactive form state
const form = reactive({
  name: '',
  email: '',
  message: ''
});

const recaptchaToken = ref('');

// Load reCAPTCHA when the component is mounted
onMounted(() => {
  loadRecaptcha();
});

const loadRecaptcha = async () => {
  try {
    const token = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'submit' });
    recaptchaToken.value = token;
  } catch (error) {
    showError("Erreur lors du chargement de la vérification CAPTCHA, rechargez la page.");
  }
};


// Handles form submission
const handleSubmit = async () => {
  if (!recaptchaToken.value) {
    showError("La validation du CAPTCHA a échoué, veuillez réessayer.");
    return;
  }

  await sendEmail(form); // Proceed with form submission
  await loadRecaptcha();  // Reset reCAPTCHA for the next submission
};

// Function to send email using EmailJS
const sendEmail = async (form) => {
  try {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    const sentForm = {
      name: form.name,
      email: form.email,
      message: form.message + '\nSigné: ' + form.email
    };

    await emailjs.send(serviceID, templateID, sentForm, userID);
    
    showSuccess();

    form.name = '';
    form.email = '';
    form.message = '';
    
  } catch (error) {
    console.warn(error);
    showError();
  }
};

// Success toast notification
const showSuccess = () => {
  if (isSupported.value) {
    vibrate();
  }

  toast.add({ severity: 'success', summary: 'Succès', detail: 'Message envoyé avec succès!', life: 3000 });
};

// Error toast notification
const showError = (message = 'Réessayez ou contactez-moi.') => {
  toast.add({ severity: 'error', summary: 'Erreur', detail: message, life: 5000 });
};

// Copy to clipboard functionality
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({ 
      severity: 'info', 
      summary: 'Copié', 
      detail: 'Texte copié dans le presse-papier.', 
      life: 2500 
    });
  } catch (error) {
    toast.add({ 
      severity: 'error', 
      summary: 'Erreur', 
      detail: 'Impossible de copier le texte.', 
      life: 2500 
    });
  }
};
</script>

<template>
  <div id="content">
    <h1 id="contentText">Vous avez une offre d'emploi ? Vous voulez me faire part de vos remarques ? </h1>
    <!-- Contact form -->
    <div id="contactform" class="ContactSquare">
      <h2>Contactez-moi</h2>
      <form id="demo-form" @submit.prevent="handleSubmit">
        <br>
        <!-- Name input -->
        <div class="flex flex-column gap-2">
          <label for="name">Nom</label>
          <InputText type="text" id="name" v-model="form.name" aria-required="true" placeholder="Prénom Nom" />
        </div>
        <br>
        <!-- Email input -->
        <div class="flex flex-column gap-2">
          <label for="email">*Email</label>
          <InputText v-model="form.email" type="email" id="email" placeholder="exemple@domaine.com" aria-required="true" required />
          <small>(Pour vous recontacter)</small>
        </div>
        <br>
        <!-- Message input -->
        <div class="flex justify-content-center">
          <Textarea id="message" v-model="form.message" variant="filled" required autoResize rows="5" cols="30" aria-required="true" placeholder="Message"></Textarea>
        </div>
        <!-- Submit button -->
        <div>
          <Button 
          type="submit" 
          id="greenValid" 
          class="g-recaptcha" 
          :disabled="!recaptchaToken">Envoyer</Button>
        </div>
        <small>Formulaire utilisant <a href="https://www.emailjs.com/" target="blank">EmailJS</a>. Le prénom sert uniquement à des fins d'authentifications de la personne (facultatif) et l'adresse-mail sert à des fins de contact. Chaque mail est confidentiel entre moi et la personne qui l'envoie et sont directement archivés puis supprimés après lecture.</small>
      </form>
    </div>

    <!-- Additional information (email, phone) -->
    <div id="informationsCard" class="ContactSquare">
      <div id="socialLinks">
        <div id="Mails">
          <div id="mailInfoContainer">
            <h2>Adresse mail universitaire: </h2>
            <div class="maillink">
              <div id="mailEtCopy">
                <p class="e-mail_adress">{{ EMAIL }}</p>
                <i class="pi pi-clone" @click="copyToClipboard(EMAIL)" title="Copier l'adresse mail"></i>
              </div>
              <Button id="greenValid" @click="sendMail_asClient(EMAIL)">Me Contacter</Button>
            </div>
          </div>

          <div id="mobileInfoContainer">
            <h2>Numéro de téléphone:</h2>
            <div id="mobileEtCopy">
              <p class="e-mail_adress">{{ MOBILE }}</p>
              <i class="pi pi-clone" @click="copyToClipboard(MOBILE)" title="Copier le numéro de téléphone"></i>
            </div>
            <small>Disponible de 13h à 14h et de 19h à 20h.</small>
            <div class="numlink">
              <Button id="greenValid" @click="callNumber_asClient(MOBILE.replace(' ',''))">Appeler</Button>
              <Button id="greenValid" @click="sendSMS_asClient(MOBILE.replace(' ',''))">Envoyer un SMS</Button>
            </div>
          </div>

  
        </div>
      </div>
    </div>
    <span id="localisationSquare" class="ContactSquare">
      <div id="carteContainer">
        <iframe width="100%" height="100%" src="https://www.openstreetmap.org/export/embed.html?bbox=5.901374816894532%2C45.7957758736992%2C6.354560852050782%2C46.002208482091724&amp;layer=mapnik&amp;marker=45.899088112583115%2C6.127967834472656" ></iframe>
      </div>
      <div id="localisationSquareText">
        <h2>Localisation</h2>
        <br>
        <p id="localisationSquareDescription">Localisé entre montagnes et lacs, dans le magnifique département de la Haute-Savoie.</p>
        <br>
        <h3>Adresse actuelle:</h3>
        <p>
          <strong>74000 ANNECY</strong>
          <br>
          <strong>Haute-Savoie, France</strong>
        </p>
        <br>
        <h3>Adresse fixe:</h3>
        <p>
          <strong>74970 MARIGNIER</strong>
          <br>
          <strong>Haute-Savoie, France</strong>
        </p>
      </div>
    </span>
  </div>

</template>

<style scoped>
  @media screen and (max-width: 860px) {
    div#content{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: wrap;
      min-height: 100vh; /* Prendre toute la hauteur */
      max-width:860px;
    }

    .ContactSquare{
      max-width: min-content; 
    }

    #footer {
      margin-top: auto; /* Pousse le footer vers le bas */
      background-color: #ccc; /* Juste pour visualiser le footer */
      padding: 10px;
      text-align: center;
    }

    div#contactform, div#informationsCard, span#localisationSquare {
      position:relative;
      float:none;
      min-width:100%;
      max-width:100%;
      width:100%;
      margin:1vh 0  1vh 0 !important;
    }

    div#informationsCard {
      position:relative;
      align-self:center;
    }

    div#carteContainer{
      width:50vw;
      height:30vh;
    }

    h1#contentText{
      padding:0 !important;
      margin:0 0 20px 0 !important;
      min-width:100vw;
    }
  }

  h1#contentText{
    padding:1vh 15vw 1vh 15vw;
    min-width:70vw;
    text-align:justify;
  }

  span#localisationSquare{
    display: flex;
    flex-direction: row;
    width:auto;

    #localisationSquareText{
      margin-left:30px;
      max-width:275px;
    }
  }

  #informationsCard {
    min-width:370px;
    width:20vw;
  }

  #contactform {
    min-width:400px;
    width:30vw
  }


  #carteContainer {
      width:30vw;
      height:40vh;
      position:relative;
      min-width:200px;
      overflow: hidden;
      border-radius: 10px;
      border: 2px solid black;
      transition: transform 0.3s ease; /* Transition du conteneur */
  }


  #carteContainer span {
      width: auto;
      height: 10vh;
      
      box-shadow: 2px 2px 5px black;
      transform: scale(1);
      transform-origin: center;
      transition: transform 0.3s ease; /* Transition de l'image */
      
      background: url("/images/contact/carte.png") no-repeat center center;
      background-size: cover; /* Couvre toute la surface */
      
      position: relative;
      display: block;
  }

  #carteContainer span:hover {
      transform: scale(3); /* Zoom à 300% */
      transform-origin: center right; /* Zoom vers le milieu droit */
  }

  #mobileInfoContainer{
      position: relative;
      margin-top:4vh;
  }

  #mailEtCopy, #mobileEtCopy {
    display: flex;
    flex-direction: row;
    padding:3px;
  }

  .pi-clone,.pi-clone:not(:hover){
    margin-left: 10px;
    cursor: pointer;
    border-radius: 3px;
    padding:5px;
    transition:0.2s ease background-color;
  }

  .pi-clone:hover{
    background-color:rgb(34, 34, 34);
    transition:0.6s ease background-color;
  }

  Button {
    margin: 5px 10px;
  }

  div#content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-evenly;

    position: relative;
    margin:5%;
  }

  .ContactSquare {
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 5px black;
    background-color: rgb(61, 61, 61);
    padding: 30px;
    box-sizing: border-box;
    
    margin:20px 45px 50px 0px;
  }



  label {
    text-align: center;
    vertical-align: center;
    color: white;
  }

  input {
    height:2rem;
  } 

  .p-float-label input:focus ~ label {
      color: white;
  }

  .p-float-label input:invalid ~ input {
      border-color:red;
  }

  input, textarea {
    margin: 5px;
    width: 100%;
  }

  .p-float-label input:invalid, 
  .p-float-label textarea:invalid {
      border-color: red;
  }

  .p-invalid {
      border-color: red !important; /* Enforces red border for invalid inputs */
  }

  input:focus, textarea:focus {
      outline: none;
      border-color: #3a833d; /* Change border color on focus */
  }
</style>
