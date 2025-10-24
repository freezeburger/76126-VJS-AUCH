<script setup lang="ts">
import { useDomainRoutes } from './route';

useDomainRoutes();
</script>

<template>
    <h1>Products Domain</h1>
    <nav>
        <RouterLink to="/products/list">Product List</RouterLink> |
        <RouterLink to="/products/1">Product Detail (ID: 1)</RouterLink> |
        <RouterLink to="/products/1/edit">Edit Product (ID: 1)</RouterLink>
    </nav>
    <hr>
    <RouterView />
</template>