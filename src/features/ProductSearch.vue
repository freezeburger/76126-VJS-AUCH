<script setup lang="ts">
import {Card, CounterButton} from '@/components';
import { computed, ref } from 'vue';


const API = 'https://dummyjson.com/products/search?q=';

const userInput = ref('');
const results = ref<{id: number,description:string, title: string, price: number}[]>([]);

const searchProducts = async () => {
    if(!userInput.value) {
        results.value = [];
        return;
    }
    if(userInput.value.length < 3) {
        return;
    }
    const response = await fetch(API + encodeURIComponent(userInput.value));
    const data = await response.json();
    results.value = data.products;
};

const collection =  computed(() => userInput.value.length < 3 ? [] : results.value); 

const currentProduct = ref<any>(null);

</script>

<template>

    <div>
        <h2>Product Search Component</h2>

        <CounterButton :count="5" @update:count="v => console.log('emitted',v)"/>
        <!-- <CounterButton :count="1" :step="5"/>
        <CounterButton :count="0" :step="10"/> -->

        <input type="text" 
               class="form-control"  
               placeholder="Search for products..."  
               v-model="userInput"
               v-on:keyup.enter="searchProducts"/>
        
        <code   class="badge rounded-pill text-bg-primary" 
                v-if="userInput" 
                v-on:click="userInput = '' ">
                {{userInput}} X
        </code>
        <hr>

        <div v-if="currentProduct">
            <h3>Selection : {{ currentProduct.title }}</h3>
        </div>
        
        <ul class="list-group">
            <li class="list-group-item"
                v-for="product in collection">
                <Card :title="product.title" 
                      :open="false" 
                      @card:open=" open => open && (currentProduct = product) ">
                    {{ product.description }}
                </Card>
            </li>
        </ul>
    </div>

</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css');

</style>