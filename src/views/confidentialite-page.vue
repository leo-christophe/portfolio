<template>
  <div class="privacy-policy">
    <h1>{{ $t("privacy.title") }}</h1>
    <small>{{ DateUtils.formatDate("2024-11-27", locale) }}</small>

    <section>
      <h2>{{ $t("privacy.cookies.title") }}</h2>
      <p>{{ $t("privacy.cookies.intro") }}</p>

      <h3>{{ $t("privacy.cookies.details.title") }}</h3>
      <ul>
        <li>
          <strong>{{ $t("privacy.cookies.details.lang.name") }}</strong
          >:
          <h4>{{ $t("privacy.cookies.details.lang.description") }}</h4>
          {{ $t("privacy.cookies.details.lang.details") }}
        </li>

        <li>
          <strong>{{ $t("privacy.cookies.details.rc_a.name") }}</strong
          >:
          <h4>{{ $t("privacy.cookies.details.rc_a.description") }}</h4>
          {{ $t("privacy.cookies.details.rc_a.details") }}
        </li>

        <li>
          <strong>{{ $t("privacy.cookies.details.rc_c.name") }}</strong
          >:
          <h4>{{ $t("privacy.cookies.details.rc_c.description") }}</h4>
          {{ $t("privacy.cookies.details.rc_c.details") }}
        </li>
      </ul>
    </section>

    <section>
      <h2>{{ $t("privacy.data_protection.title") }}</h2>
      <p>{{ $t("privacy.data_protection.content") }}</p>
    </section>

    <section>
      <h2>{{ $t("privacy.user_rights.title") }}</h2>
      <p>{{ $t("privacy.user_rights.content") }}</p>
    </section>

    <section>
      <h2>{{ $t("privacy.contact.title") }}</h2>
      <p>
        {{
          $t("privacy.contact.content", { email: "[leochristophe@outlook.fr]" })
        }}
      </p>
    </section>

    <section>
      <h2>{{ $t("privacy.policy_update.title") }}</h2>
      <p>{{ $t("privacy.policy_update.content") }}</p>
    </section>
  </div>
</template>

<script setup>
import DateUtils from "../utils/date_utils";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
</script>
  
<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #222; /* Fond sombre */
  color: #ddd; /* Texte légèrement clair pour contraste */
}

h1 {
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-bottom: 2vh;
}

h2 {
  font-size: 1.5rem;
  color: #f0f0f0;
  border-bottom: 2px solid #555;
  padding-bottom: 0.5rem;
  margin-top: 5vh;
}

h3 {
  font-size: 1.2rem;
  color: #e0e0e0;
  margin-top: 3vh;
}

p {
  line-height: 1.6;
  font-size: 1rem;
}

ul {
  margin-left: 20px;
  list-style-type: disc;
}

ul li {
  margin-bottom: 1rem;
}

strong {
  color: #a8d0e6; /* Accentuation des éléments clés */
}
</style>
