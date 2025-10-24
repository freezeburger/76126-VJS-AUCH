<script setup lang="ts">

/* defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>(); */

const modelValue = defineModel<string>();

</script>

<template>
    <input type="text" :value="modelValue" 
           @input="$emit('update:modelValue', ($event as any).target?.value )" />
</template>