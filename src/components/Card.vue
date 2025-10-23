<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
    title?: string;
    open: boolean;
}>();

const emit = defineEmits<{
    (e: 'card:open', value: boolean): void;
}>();

const open = ref(props.open);

const handleToggle = () => {
    open.value = !open.value;
    emit('card:open', open.value);
};

</script>

<template>

    <div class="card">
        <header>
            <h2>{{ title ? title : 'Default Card Title' }}</h2>
            <!-- <button @click="open = !open; $emit('card:open', open)">X</button> -->
            <button @click="handleToggle">X</button>
        </header>
        <main :class="{ 'card-open': open }">
            <slot>Default Card Content</slot>
        </main>
    </div>

</template>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

main {
    transition: max-height 0.3s ease;
    max-height: 0;
    overflow: hidden;
}

.card-open {
    max-height: 200px;
    overflow: hidden;
}
</style>