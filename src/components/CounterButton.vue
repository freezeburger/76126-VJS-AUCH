
<script setup lang="ts">
import { computed, ref, watch } from 'vue';


const props = defineProps<{
    count: number;
    step?: number;
}>();

const emit = defineEmits<{
    (e: 'update:count', value: number): void;  
}>();

const currentCount = ref(props.count);

const incrementValue =  computed( () => props.step || 1 );

watch( currentCount , ( newCount, oldCount   ) => {
    emit('update:count', currentCount.value);
});

</script>

<template>
    <div>
        <button @click=" currentCount -= incrementValue">-</button>

        <input  type="number" 
                v-model="currentCount" 
                :step="incrementValue"
                >

        <button @click=" currentCount += incrementValue">+</button>
    </div>
</template>

<style>
</style>