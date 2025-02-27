<script setup>
import { getCurrentInstance, ref } from "vue";

import Timeline from "primevue/timeline";
import { TIMELINE_STYLE } from "../data/const.js";

const instance = getCurrentInstance();

const { formations } = instance.appContext.config.globalProperties.$JSONData;
const formationTimeline = ref([...formations.slice(0, formations.length), ""]);
</script>

<template>
  <!-- Section Formations -->
  <span class="column education">
    <h1 id="titreFormations" class="formationTitres">
      {{ $t("experiences.educationTitle") }}
    </h1>
    <h4 class="sousTitreFormations formationTitres">
      {{ $t("experiences.educationSubtitle") }}
    </h4>

    <span id="conteneurTimelineFormations">
      <div class="card flex flex-wrap gap-12">
        <Timeline
          :value="formationTimeline"
          align="left"
          class="customized-timeline"
          :style="TIMELINE_STYLE"
        >
          <template #marker="formationTimeline">
            <div class="anneeCercle">
              <span
                class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm"
              >
                <i class="pi pi-circle-fill" v-if="formationTimeline.item"></i>
              </span>
            </div>
          </template>
          <template #content="formationTimeline">
            <div id="conteneurFormations" v-if="formationTimeline.item">
              <div class="conteneurBox">
                <div class="information">
                  <h5 class="annees">{{ formationTimeline.item.annees }}</h5>
                  <br />
                  <h4 class="titreFormation">
                    {{ formationTimeline.item.titre }} <br />
                    <p id="departementDetail" title="(Haute-Savoie)">
                      <strong>{{ formationTimeline.item.lieu }}</strong
                      >, {{ formationTimeline.item.ville }} ({{
                        formationTimeline.item.departement
                      }})
                    </p>
                  </h4>
                  <h5 class="obtention">
                    {{ formationTimeline.item.obtention }}
                  </h5>
                </div>
                <div class="imageFormation">
                  <a
                    :href="formationTimeline.item.siteFormation"
                    target="_blank"
                  >
                    <img
                      :src="formationTimeline.item.image"
                      class="imgFormation"
                      :alt="
                        formationTimeline.item.titre +
                        ' ' +
                        formationTimeline.item.annees +
                        ' ' +
                        formationTimeline.item.lieu
                      "
                      :title="formationTimeline.item.lieu"
                      @error="
                        (e) => (e.target.src = '/images/default-image.png')
                      "
                    />
                  </a>
                </div>
              </div>
            </div>
          </template>
        </Timeline>
      </div>
    </span>
  </span>
</template>

<style scoped>
@import url("../assets/style/ParcoursStyle.css");

span#conteneurTimelineFormations {
  max-width: 90vw;
}

.conteneurFormations {
  display: flex;
  align-items: center;
  margin: 20px 10px 10px 0px;
  padding: 20px 0;
  position: relative;
  box-shadow: 2px 2px 5px black;
}

.imgFormationContainer {
  width: 15vw;
  max-width: 200px !important;
  height: auto;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
}
</style>
