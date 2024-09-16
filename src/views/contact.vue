<script setup>
import { reactive } from 'vue'; 
import { sendMail_asClient, callNumber_asClient, sendSMS_asClient } from '../utils/contact_client'; // Correct path to your mail.js

import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const toast = useToast();

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const sendEmail = () => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userID = import.meta.env.VITE_EMAILJS_USER_ID;

  const sentForm = {
    name: form.name,
    email: form.email,
    message: form.message + '\nSigné: ' + form.email
  }


  emailjs.send(serviceID, templateID, sentForm, userID)
    .then((response) => {
      showSuccess();
    })
    .catch((error) => {
      console.warn(error);
      showError();
    });
};

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Succès', detail: 'Message envoyé avec succès!', life: 3000 });
};

const showError = () => {
  toast.add({ severity: 'error', summary: 'Erreur', detail: 'Réessayez ou contactez moi.', life: 5000 });
};
</script>

<template>
  <Toast />
  <div id="content">
    <div id="contactform" class="ContactSquare">
      <h2>Contactez-moi</h2>
      <form @submit.prevent="sendEmail">
        <br>
        <div class="flex flex-column gap-2">
          <label for="name">Nom</label>
          <InputText type="text" id="name" v-model="form.name" aria-required="true" placeholder="Prénom Nom"/>
        </div>
        <br>
        <div class="flex flex-column gap-2">
          <label for="email">*Email</label>
          <InputText v-model="form.email" type="email" id="email" placeholder="exemple@domaine.com" aria-required="true" required/>
          <small>(Pour vous recontacter)</small>
        </div>
        <div class="flex justify-content-center">
          <Textarea id="message" v-model="form.message" variant="filled" required autoResize rows="5" cols="30" aria-required="true" placeholder="Message"></Textarea>
        </div>
        <div>
          <Button type="submit" id="greenValid">Envoyer</Button>
        </div>
      </form>
    </div>
    <div id="informationsCard" class="ContactSquare">
      <div id="socialLinks">
        <div id="Mails">
          <!-- <h2>Mail personnel: </h2>
          <div class="maillink">
            <p class="e-mail_adress">leochristophe@outlook.fr</p>
            <Button id="mail" @click="sendMail_asClient('leochristophe@outlook.fr')">Me Contacter</Button>
          </div> -->
          <h2>Adresse mail universitaire: </h2>
          <div class="maillink">
            <p class="e-mail_adress">leo.christophe@etu.univ-savoie.fr</p>
            <Button id="greenValid" @click="sendMail_asClient('leo.christophe@etu.univ-savoie.fr')">Me Contacter</Button>
          </div>
          <h2>Numéro de téléphone: </h2>
            <p class="e-mail_adress">+33 07 82 42 44 96</p>
          <small>Généralement disponible de 13h à 14h et de 19h à 20h tous les jours.</small>
          <div class="numlink">
            <p class="num"></p>
            <Button id="greenValid" @click="callNumber_asClient('+330782424496')">Appeler</Button>
            <Button id="greenValid" @click="sendSMS_asClient('+330782424496')">Envoyer un SMS</Button>
          </div>
        </div>
      </div>
      <img id="carteLieu" />
    </div>

  </div>
</template>
  
<style scoped>
  Button {
    margin: 5px 10px;
  }

  div#content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    min-width: 1540px;
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
    width: calc(min-content + 20rem);
    height: auto; /* Ensure height adjusts based on content */
  }

  @media screen and (max-width: '846px') {
    div#content {
      flex-direction: column;
      align-items: center; /* Center items horizontally */
    }

    #informationsCard, #contactform {
      margin: 50px 0 5vh 0;
      width: 90%; /* Adjust width for mobile screens */
      max-width: 600px; /* Maximum width for better readability */
    }

    #contactform {
      float: none; /* Remove float for mobile view */
    }
  }

  #contactform {
    float: left;
    margin: 50px 0 5vh 250px;
    width: 30vw;
    height: auto;
  }

  /* Styles basiques pour le formulaire */
  div {
    margin-bottom: 15px;
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

  button#greenValid {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border:1px solid transparent;
  }

  button#greenValid:hover {
    background-color: #45a049;
    border:1px solid white;
    outline:white;
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
