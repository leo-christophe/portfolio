<script setup>
  import { reactive } from 'vue';
  import emailjs from 'emailjs-com';
  
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
    <div id="app">
      <h1>Contactez-moi</h1>
      <form @submit.prevent="sendEmail">
        <div>
          <label for="name">Nom:</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div>
          <label for="message">Message:</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
</template>
  
<style scoped>
  /* Styles basiques pour le formulaire */
  div {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input, textarea {
    width: 100%;
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
  