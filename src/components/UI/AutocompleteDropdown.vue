<template>
    <div class="autocomplete-container">
      <!-- Input field -->
      <InputText
        id="inputRefComp"
        v-model="inputValue"
        @input="handleInput"
        @focus="showDropdown = true"
        @blur="handleBlur"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <!-- Dropdown for suggestions -->
      <div v-if="showDropdown && suggestions.length > 0" class="suggestions-dropdown">
        <div
          v-for="suggestion in suggestions"
          :key="suggestion"
          class="suggestion-item"
          @mousedown="selectSuggestion(suggestion)"
        >
          {{ suggestion }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext'; // Import InputText from PrimeVue
  
  // Props
  const props = defineProps({
    suggestions: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Search...',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  
  // Emits
  const emit = defineEmits(['update:modelValue', 'selectSuggestion']);
  
  // Local state
  const inputValue = ref('');
  const showDropdown = ref(false);
  
  // Handle input changes
  function handleInput() {
    emit('update:modelValue', inputValue.value);
  }
  
  // Handle suggestion selection
  function selectSuggestion(suggestion) {
    inputValue.value = suggestion;
    emit('selectSuggestion', suggestion);
    showDropdown.value = false;
  }
  
  // Handle blur event
  function handleBlur() {
    setTimeout(() => {
      showDropdown.value = false;
    }, 200); // Delay to allow click events on suggestions
  }
  </script>
  
  <style scoped>

  input{
    line-height: 2em;
    width:30vw;
  }

  .autocomplete-container {
    position: relative;
    width: 100%;
  }
  
  .suggestions-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: var(--widthInput);
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    background-color: #fff;
    color: black;
    z-index: 999999;
  }
  
  .suggestion-item {
    padding: 8px 12px;
    width:30vw;
    cursor: pointer;
  }
  
  .suggestion-item:hover {
    background-color: #f0f0f0;
  }
  </style>