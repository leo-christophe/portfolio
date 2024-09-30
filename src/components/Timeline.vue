<script setup>
import { ref, computed } from 'vue';

// Props pour configurer la timeline
const props = defineProps({
  timelineHeight: {
    type: Number,
    default: 300, // Hauteur totale de la timeline en pixels
  },
  numberOfLines: {
    type: Number,
    default: 5, // Nombre de lignes de la timeline
  },
  lineColor: {
    type: String,
    default: '#000', // Couleur des lignes
  },
  lineThickness: {
    type: Number,
    default: 2, // Épaisseur des lignes
  },
});

// Calculer la position des lignes sur la timeline
const linePositions = computed(() => {
  const step = props.timelineHeight / props.numberOfLines;
  return Array.from({ length: props.numberOfLines }, (_, i) => i * step);
});
</script>

<template>
  <div class="timeline" :style="{ height: `${timelineHeight}px` }">
    <!-- Boucle pour afficher les lignes sur la timeline -->
    <div v-for="(position, index) in linePositions"
    :key="index">
    <span class="rond"></span>
    <div
      class="timeline-line"
      :style="{ top: `${position}px`, backgroundColor: lineColor, height: `${lineThickness}px` }" ></div>
</div>
  </div>
</template>

<style scoped>
span{
    width:10px;
    height:auto;
    background-color:gray;
}

/* Conteneur de la timeline */
.timeline {
  position: relative;
  width: 10px; /* Largeur de la timeline */
  background-color: #ccc; /* Couleur de fond de la timeline */
  margin: 20px;
}

/* Style des lignes de la timeline */
.timeline-line {
  position: absolute;
  width: 100%; /* La ligne prend toute la largeur de la timeline */
}
</style>
