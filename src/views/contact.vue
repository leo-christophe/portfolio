<script setup>
  import { reactive } from 'vue';
  import Button from 'primevue/button';
  import Textarea from 'primevue/textarea';
  import FloatLabel from 'primevue/floatlabel';
  import InputText from 'primevue/inputtext';
  import { useToast } from "primevue/usetoast";
  import Toast from 'primevue/toast';
  const toast = useToast();

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
        showSuccess();
      })
      .catch((error) => {
        showError();
        //console.error('Erreur lors de l\'envoi de l\'email:', error);
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
  <Toast/>
  <div id="content">
    <div id="contactform">
      <h2>Contactez-moi</h2>
      <br>
      <form @submit.prevent="sendEmail">
        <div class="flex flex-column gap-2">
        <FloatLabel>
          <InputText id="name" v-model="form.name" aria-required="true" />
          <label for="name">Nom</label>
        </FloatLabel></div>
        <div class="flex flex-column gap-2">
        <FloatLabel id="email">
          <InputText id="email" v-model="form.email" aria-required="true" aria-errormessage="Erreur"/>
          <label for="email">Email</label>
        </FloatLabel></div>

        <div class="flex justify-content-center">
          <Textarea id="message" v-model="form.message" variant="filled" required autoResize rows="5" cols="30" aria-required="true" placeholder="Message"></Textarea>
        </div>

        <div>
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
        <div id="Mails">
          <h2>Mail personnel: </h2>
          <div class="maillink">
            leochristophe@outlook.fr
          </div>
          <h2>Mail universitaire: </h2>
          <div class="maillink">
            leo.christophe@etu.univ-savoie.fr
          </div>
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
    margin-right:250px;
    margin-bottom:5vh;
    border:2px solid black;
    border-radius:5px;
    box-shadow: 2px 2px 5px black;
    padding:30px;
    background-color:rgb(61, 61, 61);
    width:500px;
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
    margin-left:250px;
    margin-top:50px;
    width:500px;
  }
  /* Styles basiques pour le formulaire */
  div {
    margin-bottom: 15px;
  }

  label{
    text-align:center;
    vertical-align: center;
    color:lightcoral;
    font-size:15px;
  }
 
  input, Textarea {
    width:100%;
    padding: 8px;
    margin-top:20px;
    box-sizing: border-box;
  }

  Textarea::placeholder{
    color:lightcoral;
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
  