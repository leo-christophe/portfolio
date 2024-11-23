<script setup>
    import { getCurrentInstance } from 'vue';

    const instance = getCurrentInstance();
    const data = instance.appContext.config.globalProperties.$JSONData;
</script>

<template>
    <h1>Compétences</h1>
    <ul>
        <li v-for="skill in data.sorted_valid_skills" :key="skill.id">
            {{ skill }}
        </li>
    </ul>
</template>

<style scoped>
    h1{
        text-align:center;
    }
</style>