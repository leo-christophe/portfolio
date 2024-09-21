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
    showError("Erreur lors du chargement de la vérification CAPTCHA, rechargez la page."+error);
  }
};


// Handles form submission
const handleSubmit = async () => {
  if (!recaptchaToken.value) {
    showError("La validation du CAPTCHA a échoué, veuillez réessayer.");
    return;
  }

  await sendEmail(form); // Proceed with form submission
  loadRecaptcha();  // Reset reCAPTCHA for the next submission
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
  </div>
</template>

<style scoped>
@media screen and (max-width: 846px) {
  div#content{
    display: flex;
    flex-direction: column;
    max-width:100vw;
  }



  #contactform, #informationsCard {
    position:relative;
    float:none;
  }

  #informationsCard {
    position:relative;
    margin-left:500px;
  }
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
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: baseline;
  }

  .ContactSquare {
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 5px black;
    background-color: rgb(61, 61, 61);
    padding: 30px;
    width: 100%; /* Full width for mobile */
    max-width: 500px; /* Maximum width */
    box-sizing: border-box; /* Ensure padding is included in width */
  }

  #informationsCard {
    margin: 50px 250px 5vh 0;
    float: right;
    width: max-content;
    min-width:405px;
    height: auto; /* Ensure height adjusts based on content */
  }



  #contactform {
    float: left;
    margin: 50px 0 5vh 250px;
    width:max-content;
    min-width:480px;
    height: auto;
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
