<script setup lang="ts">
import type { NotificationDTO } from '@/core/dto/NotificationDTO';
import { useNotificationStore } from '@/store/notification.store';
import { onMounted, ref } from 'vue';


const notificationStore = useNotificationStore();

onMounted(notificationStore.getNotifications);

const newNotification = ref<Omit<NotificationDTO, 'id'|'createdAt'>>({
    title: '',
    message: ''
});

const createNotification = async () => {
    await notificationStore.addNotification(newNotification.value);
    newNotification.value = {
        title: '',
        message: ''
    };
}
</script>

<template>
    <h1>Notifications Page {{ notificationStore.count }}</h1>
    <div v-if="notificationStore.feedbackMessage">{{ notificationStore.feedbackMessage }}</div>
    <div v-if="notificationStore.loading">Loading...</div>

    <button @click="notificationStore.getNotifications">Refresh</button>

    <hr>
    <div style="display: flex; gap: 10px; align-items: center; flex-direction: column;">
        <code>{{ newNotification }}</code>
        <Input v-model="newNotification.title" placeholder="Notification Title" />
        <Input v-model="newNotification.message" placeholder="Notification Message" />
        <button @click="createNotification">Add Notification</button>
    </div>

    <hr>
    <ul>
        <li v-for="notif in notificationStore.notifications" :key="notif.id">
            <button @click="notificationStore.removeNotification(notif)">X</button>{{ notif.message }} - {{ notif.createdAt }}
        </li>
    </ul>
</template>