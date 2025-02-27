<script setup>
import SAE501 from "../../components/ProjectTemplate.vue";
</script>

<template>
  <SAE501 id="6" />

  <div id="precisionsSAE">
    <div id="title" class="mainSection">
      <h2>{{ $t("projects.details") }}</h2>
    </div>

    <div class="mainSection">
      <div class="estSection">
        <h3>{{ $t("projects.datacare.contributions") }}</h3>
      </div>
      <p>{{ $t("projects.datacare.contributionsDetails") }}</p>
    </div>

    <div class="mainSection">
      <div class="estSection">
        <h3>{{ $t("projects.datacare.technologies") }}</h3>
      </div>
      <p>
        {{ $t("projects.datacare.technologiesDetails") }}
      </p>
    </div>

    <div class="mainSection">
      <div class="estSection">
        <h3>{{ $t("projects.datacare.api") }}</h3>
      </div>
      <p>{{ $t("projects.datacare.apiDetails") }}</p>
    </div>

    <div id="blazor" class="mainSection">
      <div class="estSection">
        <img
          src="/images/projects/Blazor.png"
          alt="Blazor"
          title="Blazor"
          class="imgExpDialog"
          height="100"
        />
      </div>
      <div>
        <h3>{{ $t("projects.datacare.client") }}</h3>
        <p>
          {{ $t("projects.datacare.clientDetails") }}
          <a
            href="https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor"
            target="_blank"
            >{{ $t("projects.datacare.clientDetailsBlazorFramework") }}</a
          >
          {{ $t("projects.datacare.clientDetailsEnd") }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainSection {
  margin-top: 20px;
}

.mainSection div.estSection,
.mainSection h2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#precisionsSAE {
  margin: 20px 20vw 5vh 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10%;
}

div#blazor {
  display: flex;
  flex-direction: row;
  gap: 5%;
  margin-top: 5vh;
}
</style>
