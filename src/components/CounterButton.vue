
<script setup lang="ts">
import { computed, ref } from 'vue';


const props = defineProps<{
    count: number;
    step?: number;
}>();

const emit = defineEmits<{
    (e: 'update:count', value: number): void;  
}>();

const currentCount = ref(props.count);

const incrementValue =  computed( () => props.step || 1 );

const increment = () => {
    currentCount.value += incrementValue.value;
    emit('update:count', currentCount.value);
};

const decrement = () => {
    currentCount.value -= incrementValue.value;
    emit('update:count', currentCount.value);
};

</script>

<template>
    <div>
        <button @click="decrement">-</button>

        <input  type="number" 
                v-model="currentCount" 
                :step="incrementValue"
                @change="$emit('update:count', currentCount)">
                
        <button @click="increment">+</button>
    </div>
</template>

<style>
</style>