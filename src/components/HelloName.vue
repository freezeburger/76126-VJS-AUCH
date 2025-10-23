<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string
}>();

const displayName = computed(() =>
  props.name?.trim() ? props.name.trim().toUpperCase() : 'Anonyme'
);
</script>

<template>
  <p>Bonjour, {{ displayName }} !</p>
</template>