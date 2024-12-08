<script setup>
// Vue
import { reactive, ref, onMounted } from 'vue';

// Components
import { sendMail_asClient, callNumber_asClient, sendSMS_asClient } from '../utils/contact_client'; 
import { isMobile, copyToClipboard } from '../utils/userdata.js'
import { MOBILE, EMAIL } from '../data/const.js';

// Libs
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n'; // Import Vue I18n
import { useVibrate } from '@vueuse/core';

// Accès aux traductions
const { t } = useI18n(); // Accès à la fonction de traduction

// Using toast for notifications
const toast = useToast();
const { vibrate, isSupported } = useVibrate({ pattern: [300] });

// Reactive form state
const form = reactive({
  name: '',
  email: '',
  message: ''
});

// Token pour reCAPTCHA
const recaptchaToken = ref('');

// Fonction pour charger reCAPTCHA
const loadRecaptcha = async () => {
  try {
    // Assurer que grecaptcha est disponible
    if (window.grecaptcha) {
      const token = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'submit' });
      recaptchaToken.value = token;
    } else {
      console.error('reCAPTCHA not loaded');
    }
  } catch (error) {
    showError(t('message.errorMessage')); // Utilise 't' au lieu de $t
  }
};

// Charger reCAPTCHA quand le composant est monté
onMounted(() => {
  const interval = setInterval(() => {
    if (window.grecaptcha) {
      clearInterval(interval);
      loadRecaptcha(); // Appelle la fonction une fois que grecaptcha est prêt
    }
  }, 400); // Vérifie toutes les 500ms si grecaptcha est chargé
});

// Handles form submission
const handleSubmit = async () => {
  if (!recaptchaToken.value) {
    showError(t('message.errorMessage')); // Utilise 't' au lieu de $t
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

  toast.add({ severity: 'success', summary: t('message.success'), detail: t('message.successMessage'), life: 3000 });
};

// Error toast notification
const showError = (Emessage = t('message.errorMessage')) => {
  toast.add({ severity: 'error', summary: t('message.error'), detail: Emessage, life: 5000 });
};

/** @function openGoogleMaps
 * 
 *  @description Ouvre Google Maps dans un nouvel onglet
 */
function openGoogleMaps() {
  window.open('https://www.google.com/maps?q=Annecy', '_blank');
}

// let textIndex = 0; // Indice pour gérer les textes
// let charIndex = 0; // Indice pour les caractères
// let currentText = null; // Texte courant
// let activeElement = null; // Élément actif

// // Liste des textes et des vitesses
// const texts = [
//   { content: "00001010111110000101", speed: 70 },
//   { content: "000010101110001101", speed: 100 },
//   { content: "00001001010010101", speed: 120 },
// ];

// function getRandomSize() {
//   return (Math.random() * 2.5 + 0.5).toFixed(2) + "em"; // Taille entre 0.5em et 3em
// }

// function getRandomYPosition() {
//   return Math.random()*-1 + 150 * 300 + "px"; // Position entre 0 et 300 pixels
// }

// function typeWriter() {
//   if (charIndex < currentText.content.length) {
//     if (activeElement === null) {
//       const lines = document.querySelectorAll(".linesOfText");
//       const randomIndex = Math.floor(Math.random() * lines.length);
//       activeElement = lines[randomIndex];
//       activeElement.textContent = ""; // Réinitialise le contenu
//       activeElement.style.fontSize = getRandomSize(); // Taille aléatoire
//       activeElement.style.transform = `translateY(${getRandomYPosition()})`; // Position verticale aléatoire
//       activeElement.style.color = "lightgray"; // Force la couleur
//     }

//     activeElement.textContent += currentText.content.charAt(charIndex); // Ajoute le prochain caractère
//     charIndex++;
//     setTimeout(typeWriter, currentText.speed);
//   } else {
//     // Réinitialisation une fois le texte terminé
//     charIndex = 0;
//     activeElement = null;
//     textIndex = (textIndex + 1) % texts.length; // Passer au texte suivant
//     currentText = texts[textIndex];
//     setTimeout(resetText, 500); // Réinitialise après 5 secondes
//   }
// }

// function resetText() {
//   document.querySelectorAll(".linesOfText").forEach((el) => {
//     el.textContent = "";
//     el.style.transform = "translateY(0)"; // Réinitialise la position Y
//   });
//   typeWriter(); // Relance l'animation
// }

// // Initialisation
// currentText = texts[textIndex];
// setTimeout(typeWriter, 200); // Lancer la boucle après 5 secondes


</script>

<template>
  <span>
  <div id="content">
    <!-- Contact form -->
    <h1 id="contentText">{{ $t('message.subtitle') }}</h1>
    <br>
    <br>
    <br>
    <div id="everythingContainer">

<!--     
      <div id="leftAnimation">
      <div>
        <span id="lineOfText"></span>
        <span class="linesOfText"></span>
        <span class="linesOfText"></span>
        <span class="linesOfText"></span>
        <span class="linesOfText"></span>
        <span class="linesOfText"></span>
        <span class="linesOfText"></span>
      </div>
    </div> -->

    <div id="formAIcons">
      <div id="contactform" class="ContactSquare">
        <h2>{{ $t('message.contactTitle') }}</h2>
        <form id="demo-form" @submit.prevent="handleSubmit">
          <br>
          <!-- Name input -->
          <div class="flex flex-column gap-2">
            <label for="name">{{ $t('message.nameLabel') }}</label>
            <InputText type="text" id="name" v-model="form.name" aria-required="true" :placeholder="$t('message.nameLabel')" />
          </div>
          <br>
          <!-- Email input -->
          <div class="flex flex-column gap-2">
            <label for="email">{{ $t('message.emailLabel') }}</label>
            <InputText v-model="form.email" type="email" id="email" :placeholder="$t('message.example')+'@'+$t('message.domain')" aria-required="true" required />
            <small>({{ $t('message.emailDisclaimer') }})</small>
          </div>
          <br>
          <!-- Message input -->
          <div class="flex justify-content-center">
            <Textarea id="message" v-model="form.message" variant="filled" required autoResize rows="5" cols="30" aria-required="true" :placeholder="$t('message.messageLabel')"></Textarea>
          </div>
          <!-- Submit button -->
          <div>
            <Button 
            type="submit" 
            id="greenValid" 
            class="g-recaptcha" 
            :disabled="!recaptchaToken">{{ $t('message.submitButton') }}</Button>
          </div>
          <small>
            {{ $t('message.formDisclaimer') }}
          </small>
        </form>
      </div>
      <span id="infoBubbles" style="display:flex;flex-direction: column;justify-content: space-evenly;">
        <div id="bubble1" class="bubble">
          <div @click="callNumber_asClient(MOBILE)" :title="$t('message.availability') " class="iconContainer">
            <i class="pi pi-phone infoRightIcon"></i>
          </div>
          <div class="bubbleInfo">
            <span>{{$t('message.phoneSectionTitle')}}</span>
            <div>
              <span>{{ MOBILE }}</span><i class="pi pi-clone" @click="copyToClipboard(MOBILE, toast, t)" :title="$t('message.copyTitle')"></i>
            </div>
          </div>
        </div>
        <div id="bubble2" class="bubble">
          <div @click="sendMail_asClient(EMAIL)" class="iconContainer">
            <i class="pi pi-envelope infoRightIcon"></i>
          </div>
          <div class="bubbleInfo">
            <span>{{$t('message.emailSectionTitle')}}</span>
            <div>
              <span>leo.christophe@etu.univ-savoie.fr</span><i class="pi pi-clone" @click="copyToClipboard(EMAIL, toast, t)" :title="$t('message.copyTitle')"></i>
            </div>
          </div>
        </div>
        <div id="bubble3" class="bubble">
          <div @click="openGoogleMaps" class="iconContainer">
            <i class="pi pi-map-marker infoRightIcon"></i>
          </div>
          <div class="bubbleInfo">
            <span>{{$t('message.locationTitle')}}</span>
            <span>Annecy, France</span>
          </div>
        </div>
      </span>
    </div>
  </div>

    <!-- Additional information (email, phone) -->
    <!-- <div id="informationsCard" class="ContactSquare">
      <div id="socialLinks">
        <div id="Mails">
          <div id="mailInfoContainer">
            <h2>{{ $t('message.emailSectionTitle') }}</h2>
            <div class="maillink">
              <div id="mailEtCopy">
                <p class="e-mail_adress">{{ EMAIL }}</p>
                <i class="pi pi-clone" @click="copyToClipboard(EMAIL, toast, t)" :title="$t('message.copyTitle')"></i>
              </div>
              <Button id="greenValid" @click="sendMail_asClient(EMAIL)">{{ $t('message.contactButton') }}</Button>
            </div>
          </div>

          <div id="mobileInfoContainer">
            <h2>{{ $t('message.phoneSectionTitle') }}</h2>
            <div id="mobileEtCopy">
              <p class="e-mail_adress">{{ MOBILE }}</p>
              <i class="pi pi-clone" @click="copyToClipboard(MOBILE, toast, t)" :title="$t('message.copyTitle')"></i>
            </div>
            <small>{{ $t('message.availability') }}</small>
            <div class="numlink">
              <Button id="greenValid" @click="callNumber_asClient(MOBILE.replace(/\s/g, ''))">{{ $t('message.callButton') }}</Button>
              <Button v-if="isMobile()" id="greenValid" @click="sendSMS_asClient(MOBILE.replace(/\s/g, ''))">{{ $t('message.smsButton') }}</Button>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <span id="localisationSquare" class="ContactSquare">
      <div id="carteContainer">
        <iframe width="100%" height="100%" src="https://www.openstreetmap.org/export/embed.html?bbox=5.901374816894532%2C45.7957758736992%2C6.354560852050782%2C46.002208482091724&amp;layer=mapnik&amp;marker=45.899088112583115%2C6.127967834472656" ></iframe>
      </div>
      <div id="localisationSquareText">
        <h2>{{ $t('message.locationTitle') }}</h2>
        <br>
        <p id="localisationSquareDescription">{{ $t('message.localisationDescription') }}</p>
        <br>
        <h3>{{ $t('message.currentAddress') }}</h3>
        <p>
          <strong>74000 ANNECY</strong>
          <br>
          <strong>{{ $t('message.region') }}</strong>
        </p>
        <br>
        <h3>{{ $t('message.permanentAddress') }}</h3>
        <p>
          <strong>74970 MARIGNIER</strong>
          <br>
          <strong>{{ $t('message.region') }}</strong>
        </p>
      </div>
    </span> -->
  </div>
</span>
</template>


<style scoped>
/* 
.linesOfText {
  display: inline-block;
  margin: 5px;
  font-weight: bold !important; 
  position: relative !important; 
  transition: transform 0.3s ease;
  white-space: pre; 
  color:rgb(71, 71, 71);
}

.linesOfText:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
} */


.bubble{
  display:flex;
  flex-direction: row;
  align-items: center;
  .pi-phone{
    cursor:pointer;
  }

  .infoRightIcon{
    cursor:pointer;
  }

  .iconContainer{
    font-size: 1rem;
    background-color: rgb(61, 61, 61);
    color:var(--secondColor);
    border-radius: 10%;
    padding:20px;
    width:4em;
    height:4em;
    display:flex;
    justify-content: center;
    align-items: center;
  }
}

.iconContainer:hover{
  i{
    transform:scale(1.1);
    transition:0.5s ease;
  }
}

.bubble .bubbleInfo{
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding:25px 0 25px 15px; 
  min-width:287px;
}
  @media screen and (max-width: 860px) {
    div#formAIcons{
      display:flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;

      #infoBubbles{
        display:flex;
        flex-direction: column;
        transform: scale(1.5);
        margin: 0px 0 100px 0;
      }
    }


    #carteContainer {
      width: 100%;
      height:auto !important;
    }

    p.e-mail_adress{
      font-size: 2rem !important;
    }

    p,label,::placeholder,input{
      font-size: 1.5rem !important;
    }

    input{
      height: 3rem !important;
    }

    textarea{
      height: 10rem !important;
    }

    small{
      font-size: 1rem !important;
    }

    div#content{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 100vh; /* Prendre toute la hauteur */
      max-width:860px;
    }

    .pi-clone{
      transform:scale(1.5);
      height:min-content;
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

      position:relative;
      min-width:200px;
      overflow: hidden;
      border-radius: 10px;
      border: 2px solid black;
      transition: transform 0.3s ease; /* Transition du conteneur */
    }

    h1#contentText{
      padding:0 !important;
      margin:0 0 20px 40px !important;
      min-width:78vw;
      max-width: 90vw;
      
    }
  }

  h1#contentText{
    padding:0vh 15vw 1vh 15vw;
    min-width:70vw;
    text-align:center;
  }

  span#localisationSquare{
    display: flex;
    flex-direction: row;
    width:auto;
    padding:30px;
    margin:0;
    max-width:50vw;

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
    min-width:450px;
    width:30vw
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
    background-color:var(--buttonShadow);
    transition:0.6s ease background-color;
  }

  Button {
    margin: 5px 10px;
  }

  div#content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content:space-evenly;

    position: relative;
    margin:1% 5% 5vh 5%;
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
    color: var(--textBasicColor);
  }

  input {
    height:2rem;
  } 

  input, textarea {
    margin: 5px;
    width: 100%;
  }

  input:focus, textarea:focus {
      outline: none;
      border-color: #3a833d; /* Change border color on focus */
  }

  #formAIcons{
    z-index:1000;
    position:relative;
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
  }
</style>
