<script setup>
  import { reactive } from 'vue';
  import emailjs from 'emailjs-com';
  import Button from 'primevue/button';
  import Textarea from 'primevue/textarea';

  // Initialiser le formulaire réactif
  const form = reactive({
    name: '',
    email: '',
    message: ''
  });
  
  // Fonction pour envoyer l'email
  const sendEmail = () => {
    // Paramètres pour EmailJS
    const serviceID = 'service_tcbnudx';
    const templateID = 'template_1bp71gw';
    const userID = 'LN83MbWIDCH_7gK9_';
  
    emailjs.send(serviceID, templateID, form, userID)
      .then((response) => {
        console.log('Email envoyé avec succès!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
      });
  };
</script>

<template>
  <div id="content">
    <div id="contactform">
      <h2>Contactez-moi</h2>
      <br>
      <form @submit.prevent="sendEmail">
        <div>
          <label for="name">Nom:</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="flex justify-content-center">
          <label for="message">Message:</label>
          <Textarea id="message" v-model="form.message" variant="filled" required autoResize rows="5" cols="30" ></Textarea>
        </div>
        <div class="card flex justify-content-center">
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
    </div>
    <div id="informationsCard">
      <div id="socialLinks">
        <div class="link">
          Github
        </div>
        <div class="link">
          LinkedIn
        </div>
      </div>
      <img id="carteLieu"></img>
    </div>
  </div>

</template>
  
<style scoped>
  #informationsCard{
    margin-top:50px;
    float:right;
    margin-right:20px;
    margin-bottom:5vh;
    border:2px solid black;
    border-radius:5px;
    box-shadow: 2px 2px 5px black;
    padding:30px;

    width:40%;
  }

  #contactform{
    margin-bottom:5vh;
    border:2px solid black;
    border-radius:5px;
    box-shadow: 2px 2px 5px black;
    padding:30px;
    background-color:rgb(61, 61, 61);
    width:50vw;
    float:left;
    margin-left:20px;
    margin-top:50px;
  }
  /* Styles basiques pour le formulaire */
  div {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input, Textarea {
    width:50%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
</style>
  