<script setup>
import Button from "primevue/button";
import { ref, onMounted } from "vue";

const cookiesAccepted = ref(false);

// Vérifie si l'utilisateur a déjà défini ses préférences
onMounted(() => {
  const cookiePreference = localStorage.getItem("cookieChoice");
  // Si l'utilisateur a déjà accepté ou rejeté les cookies, cache le bandeau
  if (cookiePreference == "1") {
    cookiesAccepted.value = true;
  }
});

/**
 *  @function rejectCookies
 *  @description Rejette les cookies et cache le bandeau
 *  @returns {void}
 */
function rejectCookies() {
  cookiesAccepted.value = true;
  localStorage.setItem("cookieChoice", "1");
}
</script>

<template>
  <!-- Affiche le bandeau si le cookie n'a pas encore été choisi -->
  <div v-if="!cookiesAccepted" class="cookie-banner">
    <p>
      {{ $t("cookieBanner.disclaimer") }}
      <a href="/confidentialite">{{ $t("cookieBanner.privacypolicy") }}</a
      >.
    </p>
    <div class="actions" @click="rejectCookies">
      <Button id="btnReject"><i class="pi pi-times"></i></Button>
    </div>
  </div>
</template>

<style scoped>
#btnReject {
  background-color: transparent;
  transition: 1s ease;
}

#btnReject:hover {
  background-color: transparent;
  border: 1px solid transparent;
  color: none;
  transition: 1s ease;
}
#btnReject:active {
  background-color: transparent;
  border: 1px solid transparent;
  color: none;
  transition: 1s ease;
}

.cookie-banner {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.cookie-banner a {
  color: #1abc9c;
  text-decoration: underline;
}

.cookie-banner .actions {
  display: flex;
  gap: 10px;
}

.cookie-banner Button {
  background-color: black;
  border: 1px solid transparent;
  padding: 10px 15px;
  border-radius: 5px;
  color: var(--secondColor);
  cursor: pointer;
  transition: background-color 0.3s;
}

.cookie-banner Button:hover {
  border: 1px solid white;
  color: white;
}
</style>
