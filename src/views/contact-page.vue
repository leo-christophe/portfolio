<script setup>
// Vue
import { reactive, ref, onMounted } from "vue";

// Components
import {
  sendMail_asClient,
  callNumber_asClient
} from "../utils/contact_client";
import { copyToClipboard } from "../utils/userdata.js";
import { MOBILE, EMAIL } from "../data/const.js";

// Libs
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n"; // Import Vue I18n
import { useVibrate } from "@vueuse/core";

// Accès aux traductions
const { t } = useI18n(); // Accès à la fonction de traduction

const submitButton = ref(null); // Référence pour le bouton de soumission

// Using toast for notifications
const toast = useToast();
const { vibrate, isSupported } = useVibrate({ pattern: [300] });

// Reactive form state
const form = reactive({
  name: "",
  email: "",
  message: "",
});

// Token pour reCAPTCHA
const recaptchaToken = ref("");

const loadRecaptcha = () => {
  if (window.grecaptcha) {
    // window.grecaptcha.ready(() => {
    //   console.log("reCAPTCHA prêt");
    // });
  } else {
    console.error("reCAPTCHA non disponible");
  }
};

onMounted(() => {
  loadRecaptcha();
});

const handleSubmit = async () => {
  if (!window.grecaptcha) {
    showError("reCAPTCHA non chargé");
    return;
  }

  try {
    // Générer le token reCAPTCHA
    recaptchaToken.value = await window.grecaptcha.execute(
      import.meta.env.VITE_RECAPTCHA_SITE_KEY,
      { action: "submit" }
    );

    if (!recaptchaToken.value) {
      showError("Échec de la génération du token reCAPTCHA");
      return;
    }

    // Test
    // Envoi du formulaire à l'API
    const response = await fetch(`/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: recaptchaToken.value,
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });


    const data = await response.json();

    if (!data.success) {
      alert(data.success)
      showError("Erreur: " + (data.message || "Validation reCAPTCHA échouée"));
      return;
    }
    showSuccess();
    form.name = "";
    form.email = "";
    form.message = "";

  } catch (error) {
    showError("Erreur: " + error.message);
    return;
  }
}

// Success toast notification
const showSuccess = () => {
  if (isSupported.value) {
    vibrate();
  }

  toast.add({
    severity: "success",
    summary: t("contact.success"),
    detail: t("contact.successMessage"),
    life: 4000,
  });
};

// Error toast notification
const showError = (Emessage = t("contact.errorMessage")) => {
  toast.add({
    severity: "error",
    summary: t("contact.error"),
    detail: Emessage,
    life: 5000,
  });
};

/** @function openGoogleMaps
 *
 *  @description Ouvre Google Maps dans un nouvel onglet
 */
function openGoogleMaps() {
  window.open("https://www.google.com/maps?q=Annecy", "_blank");
}
</script>

<template>
  <span>
    <div id="content">
      <!-- Contact form -->
      <h1 id="contentText">{{ $t("contact.subtitle") }}</h1>
      <br />
      <br />
      <br />
      <div id="everythingContainer">
        <div id="formAIcons">
          <div id="contactform" class="ContactSquare">
            <h2>{{ $t("contact.contactTitle") }}</h2>
            <form id="demo-form" @submit.prevent="handleSubmit">
              <br />
              <!-- Name input -->
              <div class="flex flex-column gap-2">
                <InputText
                  type="text"
                  id="name"
                  minlength="2"
                  maxlength="50"
                  required
                  v-model="form.name"
                  aria-required="true"
                  :placeholder="$t('contact.nameLabel')"
                />
              </div>
              <br />
              <!-- Email input -->
              <div class="flex flex-column gap-2">
                <label for="email"></label>
                <InputText
                  v-model="form.email"
                  type="email"
                  id="email"
                  :placeholder="t('contact.emailLabel')"
                  aria-required="true"
                  required
                />
              </div>
              <br />
              <!-- Message input -->
              <div class="flex justify-content-center">
                <Textarea
                  id="message"
                  v-model="form.message"
                  variant="filled"
                  required
                  autoResize
                  rows="5"
                  cols="30"
                  minlength="10"
                  maxlength="1000"
                  aria-required="true"
                  :placeholder="$t('contact.messageLabel')"
                ></Textarea>
              </div>
              <!-- Submit button -->

              <div class="justify-content-center">
                <Button
                  ref="submitButton"
                  type="submit"
                  id="greenValid"
                  class="g-recaptcha"
                  
                  >{{ $t("contact.submitButton") }}</Button
                >

              </div>
            </form>
          </div>
          <span
            id="infoBubbles"
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
            "
          >
            <div id="bubble1" class="bubble">
              <div
                @click="callNumber_asClient(MOBILE)"
                :title="$t('contact.availability')"
                class="iconContainer"
              >
                <i class="pi pi-phone infoRightIcon"></i>
              </div>
              <div class="bubbleInfo">
                <span>{{ $t("contact.phoneSectionTitle") }}</span>
                <div>
                  <span>{{ MOBILE }}</span
                  ><i
                    class="pi pi-clone"
                    @click="copyToClipboard(MOBILE, toast, t)"
                    :title="$t('contact.copyTitle')"
                  ></i>
                </div>
              </div>
            </div>
            <div id="bubble2" class="bubble">
              <div @click="sendMail_asClient(EMAIL)" class="iconContainer">
                <i class="pi pi-envelope infoRightIcon"></i>
              </div>
              <div class="bubbleInfo">
                <span>{{ $t("contact.emailSectionTitle") }}</span>
                <div>
                  <span>leo.christophe@etu.univ-savoie.fr</span
                  ><i
                    class="pi pi-clone"
                    @click="copyToClipboard(EMAIL, toast, t)"
                    :title="$t('contact.copyTitle')"
                  ></i>
                </div>
              </div>
            </div>
            <div id="bubble3" class="bubble">
              <div @click="openGoogleMaps" class="iconContainer">
                <i class="pi pi-map-marker infoRightIcon"></i>
              </div>
              <div class="bubbleInfo">
                <span>{{ $t("contact.locationTitle") }}</span>
                <span>Annecy, France</span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </span>
</template>

<style scoped>
::placeholder {
  padding-left: 0.25em;
}

.bubble {
  display: flex;
  flex-direction: row;
  align-items: center;
  .pi-phone {
    cursor: pointer;
  }

  .infoRightIcon {
    cursor: pointer;
  }

  .iconContainer {
    font-size: 1rem;
    background-color: rgb(61, 61, 61);
    color: var(--secondColor);
    border-radius: 10%;
    padding: 20px;
    width: 4em;
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.iconContainer:hover {
  i {
    transform: scale(1.1);
    transition: 0.5s ease;
  }
}

.bubble .bubbleInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 25px 0 25px 15px;
  min-width: 287px;
}

@media screen and (max-width: 860px) {
  div#formAIcons {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    #infoBubbles {
      display: flex;
      flex-direction: column;
      transform: scale(1.5);
      margin: 0px 0 100px 0;
    }
  }

  #carteContainer {
    width: 100%;
    height: auto !important;
  }

  p.e-mail_adress {
    font-size: 2rem !important;
  }

  p,
  label,
  ::placeholder,
  input {
    font-size: 1.4rem !important;
  }

  input {
    height: 3rem !important;
  }

  textarea {
    height: 10rem !important;
  }

  small#formDisclaimer {
    font-size: 1rem;
  }

  small#emailDisclaimer {
    font-size: 1.15rem;
  }

  div#content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100vh; /* Prendre toute la hauteur */
    max-width: 860px;
  }

  .pi-clone {
    height: min-content;
  }

  .ContactSquare {
    max-width: min-content;
  }

  #footer {
    margin-top: auto; /* Pousse le footer vers le bas */
    background-color: #ccc; /* Juste pour visualiser le footer */
    padding: 10px;
    text-align: center;
  }

  div#contactform,
  div#informationsCard,
  span#localisationSquare {
    position: relative;
    float: none;
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    margin: 1vh 0 1vh 0 !important;
  }

  div#informationsCard {
    position: relative;
    align-self: center;
  }

  div#carteContainer {
    width: 50vw;
    height: 30vh;

    position: relative;
    min-width: 200px;
    overflow: hidden;
    border-radius: 10px;
    border: 2px solid black;
    transition: transform 0.3s ease; /* Transition du conteneur */
  }

  h1#contentText {
    padding: 0 !important;
    margin: 0 0 20px 40px !important;
    min-width: 78vw;
    max-width: 90vw;
  }
}

h1#contentText {
  padding: 0vh 15vw 1vh 15vw;
  min-width: 70vw;
  text-align: center;
}

span#localisationSquare {
  display: flex;
  flex-direction: row;
  width: auto;
  padding: 30px;
  margin: 0;
  max-width: 50vw;

  #localisationSquareText {
    margin-left: 30px;
    max-width: 275px;
  }
}

#informationsCard {
  min-width: 370px;
  width: 20vw;
}

#contactform {
  min-width: 450px;
  width: 30vw;
}

#mobileInfoContainer {
  position: relative;
  margin-top: 4vh;
}

#mailEtCopy,
#mobileEtCopy {
  display: flex;
  flex-direction: row;
  padding: 3px;
}

.pi-clone,
.pi-clone:not(:hover) {
  margin-left: 10px;
  cursor: pointer;
  border-radius: 3px;
  padding: 5px;
  transition: 0.2s ease background-color;
}

.pi-clone:hover {
  background-color: var(--buttonShadow);
  transition: 0.6s ease background-color;
}

Button {
  margin: 5px 10px;
}

div#content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;

  position: relative;
  margin: 1% 5% 5vh 5%;
}

.ContactSquare {
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 2px 2px 5px black;
  background-color: rgb(61, 61, 61);
  padding: 30px;
  box-sizing: border-box;

  margin: 20px 45px 50px 0px;
}

label {
  text-align: center;
  vertical-align: center;
  color: var(--textBasicColor);
}

input {
  height: 2rem;
}

input,
textarea {
  margin: 5px;
  width: 100%;
  font-size: 1em;
  line-height: 2;
}

input:focus,
textarea:focus {
  outline: none;
}

#formAIcons {
  z-index: 1000;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
