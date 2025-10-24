<script setup lang="ts">
import { Input, ToggleSwitch } from '@/components';
import { ref } from 'vue';


const isOn = ref(false);

const text = ref('Hello');

</script>

<template>
    ABOUT PAGE
    <hr>

    <!-- <ToggleSwitch :model-value="isOn" @update:modelValue="isOn = $event" /> -->

    
    <ToggleSwitch v-model="isOn" />

    <Input v-model="text" /> - {{ text }}


    <p>The switch is {{ isOn ? 'ON' : 'OFF' }}</p>
</template>