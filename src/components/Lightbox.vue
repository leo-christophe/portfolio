<template>
    <div v-if="isOpen" class="lightbox">
      <div class="lightbox-content">
        <!-- Close Button -->
        <span class="close" @click="closeLightbox"><i class="pi pi-times"/></span>
  
        <!-- Display image if type is image -->
        <div v-if="type === 'image'">
          <img :src="content" class="lightbox-image" :alt="description">
        </div>
  
        <!-- Display video if type is video -->
        <div v-else-if="type === 'video'">
          <iframe width="100%" height="100%" :src="content" frameborder="0" allowfullscreen></iframe>
        </div>
  
        <!-- PowerBI integration (optional) -->
        <div v-else-if="type === 'powerbi'">
          <iframe width="660" height="415" :src="content" frameborder="1" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: 'image'
    },
  });
  
  const emit = defineEmits(['close']);
  const closeLightbox = () => emit('close');
  </script>
  <style scoped>
  .pi-times {
    font-size: 2rem;
    background-color: black;
    padding:15px;
    border-radius: 50%;
  }

  .lightbox {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* Prevent overflow */
  }
  
  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh; /* Use viewport height */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black; /* Black background for the container */
    padding: 10px;
    border-radius: 8px;
  }
  
  /* Close button styling */
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white; /* White cross color */
    font-size: 2rem; /* Adjust font size */
    cursor: pointer;

    border: none;
    z-index: 2; /* Ensure the close button stays above everything else */
    padding: 5px;
    
    transition:0.5s linear all; /* Optional: Add a smooth transition */
  }
  
  .close:hover {
    transition:0.2s ease-in-out; /* Optional: Add a smooth transition */

    i{
      border:1px solid rgb(255, 255, 255); /* Optional: Add a border on hover */
    }
  }
  
  .lightbox-image {
    max-width: 100%;
    max-height: 90vh; /* Limit height to the viewport height */
    object-fit: contain; /* Ensures the image maintains its aspect ratio */
  }
  
  .imageDescription {
    color: lightgray;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  
  