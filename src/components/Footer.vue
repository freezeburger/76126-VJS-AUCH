<script setup lang="ts">
import { useTime } from '../composables/useTime.hook';

/* 
   This is a module augmentation file for Vue.js components.
   It allows you to add custom properties or methods to the component instance type.
*/
const {time} = useTime();
</script>

<template>
    <footer>
        <p>© 2024 Auchan.lu. All rights reserved. {{time}}</p>
    </footer>
</template>

<style scoped>
footer {
    position:absolute;
    width:100%;
    bottom: 0;
    background-color: black;
    text-align: center;
    height: 8vh;
    color: white;
}
</style>
