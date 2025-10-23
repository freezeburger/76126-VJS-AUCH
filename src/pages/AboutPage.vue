<script setup lang="ts">
import { ToggleSwitch } from '@/components';

</script>

<template>
    ABOUT PAGE
    <hr>
    <ToggleSwitch :model-value="true" />
    <ToggleSwitch :model-value="true" disabled />

    <!-- <p>The switch is {{ isOn ? 'ON' : 'OFF' }}</p -->
</template>