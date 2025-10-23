<script setup lang="ts">
/* 
   This is a module augmentation file for Vue.js components.
   It allows you to add custom properties or methods to the component instance type.
*/

import { useTime } from '../composables/useTime.hook';
const { time } = useTime();

</script>

<template>
   <header>
      <h1>Auchan.lu </h1>
      <h2>{{ time }}</h2>
   </header>
</template>

<style>
body {
   margin: 0;
   font-family: Arial;
}
</style>

<style scoped>
header {
   background-color: #f5f5f5;
   padding: 1rem;
   text-align: center;
   border-bottom: 2px solid #ccc;
   height:12vh;

   transition: all 0.3s ease ;

   &:hover {
      background-color: black;
      color: white;
   }
}
</style>
