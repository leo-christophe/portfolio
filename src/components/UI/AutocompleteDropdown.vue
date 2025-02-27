<template>
  <div class="autocomplete-container">
    <!-- Affichage des éléments sélectionnés -->
    <div v-if="selectedItems.length > 0" class="selected-chips">
      <span v-for="(item, index) in selectedItems" :key="index" class="chip">
        {{ item }}
        <i class="pi pi-times" @click="removeItem(index)"></i>
      </span>
    </div>

    <!-- Input field -->
    <InputText
      id="inputRefComp"
      ref="input"
      v-model="inputValue"
      @input="handleInput"
      @focus="showDropdown = true"
      @blur="handleBlur"
      :placeholder="placeholder"
      :disabled="disabled"
    />

    <!-- Dropdown for suggestions -->
    <div
      v-if="showDropdown && suggestions.length > 0"
      class="suggestions-dropdown"
    >
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
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext"; // Import InputText from PrimeVue
import { watch } from "vue";

const props = defineProps({
  modelValue: {
    // Ajoutez cette prop
    type: String,
    default: "",
  },
  suggestions: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["update:modelValue", "selectSuggestion"]);

// Local state
const inputValue = ref("");
const showDropdown = ref(false);
const selectedItems = ref([]); // Ajout de selectedItems

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  },
);

// Handle input changes
function handleInput() {
  emit("update:modelValue", inputValue.value);
}

function selectSuggestion(suggestion) {
  if (!props.multiple) {
    inputValue.value = suggestion;
    emit("selectSuggestion", suggestion);
    emit("update:modelValue", suggestion); // Met à jour modelValue
  } else {
    if (!selectedItems.value.includes(suggestion)) {
      selectedItems.value.push(suggestion);
      inputValue.value = "";
      emit("selectSuggestion", suggestion); // Émet le même événement
      emit("update:modelValue", ""); // Réinitialise modelValue
    }
  }
  showDropdown.value = false;
}

// Handle blur event
function handleBlur() {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200); // Delay to allow click events on suggestions
}

// Remove an item from selectedItems
function removeItem(index) {
  selectedItems.value.splice(index, 1);
}

const input = ref(null);

onMounted(() => {
  if (input.value && input.value.$el) {
    input.value.$el.addEventListener("focus", () => {
      emit("update:modelValue", inputValue.value); // Émettre la valeur actuelle pour déclencher les suggestions
    });
  }
});
</script>

<style scoped>
input {
  line-height: 2em;
  width: 30vw;
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
  width: 30vw;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}

.selected-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.chip {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chip i {
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.chip i:hover {
  color: var(--primary-color-text);
}
</style>
