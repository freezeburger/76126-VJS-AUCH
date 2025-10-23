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

</script>
<template>
    <fieldset class="toggle" :disabled="disabled">
        <input type="checkbox" role="switch" v-model="modelValue" :aria-pressed="modelValue" :tabindex="modelValue ? '1' : '0'"
            @keyup.enter.prevent="toggle" @keyup.space.prevent="toggle" @click="toggle" />

        <label></label>
    </fieldset>
</template>

<style scoped>
.toggle {
    position: relative;
}

.toggle input[type="checkbox"] {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
}

.toggle label {
    position: relative;
    display: flex;
    align-items: center;
}

.toggle label:before {
    content: '';
    width: 84px;
    height: 42px;
    background: #EF5350;
    position: relative;
    display: inline-block;
    box-shadow: inset 0 0.1em 0.03em rgb(0 0 0 / 20%),
        inset 0 0.1em 0.3em rgb(0 0 0 / 30%),
        0 0 2em rgb(255 255 255 / 60%),
        inset 0 0 #66BB6A;
    transition: 0.2s ease-in;
}

.toggle label:after {
    content: '';
    position: absolute;
    width: 36px;
    height: 36px;
    left: 3px;
    top: 3px;
    z-index: 2;
    background: #fefefe;
    box-shadow: 0 2px 5px #0002;
    transition: 0.2s ease-in;
}

.toggle input[type="checkbox"]:hover+label:after {
    box-shadow: 0 2px 15px 0 #0002, 0 3px 8px 0 #0001;
}

.toggle:not(:disabled) input[type="checkbox"]:checked+label:before {
    box-shadow: inset 0 0.1em 0.03em rgb(0 0 0 / 20%),
        inset 0 0.1em 0.3em rgb(0 0 0 / 30%),
        0 0 2em rgb(255 255 255 / 60%),
        inset 84px 0 #66BB6A;
}

.toggle input[type="checkbox"]:checked+label:after {
    transform: translatex(42px);
}

.toggle[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
}

.toggle[disabled] label:before {
    background: #ccc!important;
    box-shadow: none;
    cursor: none;
}
</style>