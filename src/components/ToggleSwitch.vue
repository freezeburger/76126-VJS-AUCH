<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: boolean
  disabled?: boolean
}>(), {
  disabled: false
});

const modelValue = ref(props.modelValue);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

function toggle() {
  if (props.disabled) return;
  modelValue.value = !modelValue.value;
  emit('update:modelValue', modelValue.value);
}

function onKey(e: KeyboardEvent) {
  if (props.disabled) return;
    toggle();
}
</script>

<template>
  <div
    :class="['toggle', modelValue ? 'on' : 'off', { disabled }]"
    role="button"
    :aria-pressed="modelValue"
    :tabindex="disabled ? -1 : 0"
    @click="toggle"
    @keydown.space.prevent="onKey"
    @keydown.enter.prevent="onKey"
  >
    <span>{{ modelValue ? 'ON' : 'OFF' }}</span>
  </div>
</template>

<style scoped>
.toggle { display:inline-flex; align-items:center; padding:0.25rem 0.5rem; border:1px solid #ccc; border-radius:999px; user-select:none; cursor:pointer; }
.toggle.on { background:#e6ffe6; }
.toggle.off { background:#ffecec; }
.toggle.disabled { opacity:0.6; cursor:not-allowed; }
</style>