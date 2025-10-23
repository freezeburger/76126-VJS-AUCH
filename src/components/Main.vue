
<script setup lang="ts">
/* 
   This is a module augmentation file for Vue.js components.
   It allows you to add custom properties or methods to the component instance type.
*/

const props = defineProps<{
  disabled?: boolean;
}>();

console.log({...props})

</script>

<template>
    <main>
        <slot>Default Content</slot>
    </main>
</template>

<style scoped>
main {
  display: block;
  padding: 16px;
  background-color: #f9f9f9;
  height: 80vh;
}
</style>
