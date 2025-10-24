<script setup lang="ts">
/* 
   This is a module augmentation file for Vue.js components.
   It allows you to add custom properties or methods to the component instance type.
*/

// import {Footer, Header, Main} from '@/components'
import * as UI from '@/components';

</script>

<template>
  <UI.Header />

    <RouterLink to="/">Go to Home</RouterLink>  | 
    <RouterLink to="/about">Go to About</RouterLink>  | 
    <RouterLink to="/notifications">Go to Notifications</RouterLink>  | 
    <RouterLink to="/products">Go to Products</RouterLink>

    <UI.Main disabled>
      <RouterView />
    </UI.Main>

  <UI.Footer />
</template>

<style scoped></style>
