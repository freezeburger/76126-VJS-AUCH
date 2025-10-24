<script setup lang="ts">
import type { NotificationDTO } from '@/core/dto/NotificationDTO';
import { notificationService } from '@/core/services/notification.service';
import { onMounted, ref } from 'vue';

const notifications = ref<NotificationDTO[]>([]);

const load = async () => {
    notifications.value = await notificationService.read();
}

const deleteNotification = async (notif: NotificationDTO) => {
    await notificationService.delete(notif);
    await load();
}

onMounted(load);

const newNotification = ref<Omit<NotificationDTO, 'id'>>({
    title: '',
    message: '',
    createdAt: Date.now(),
});


const createNotification = async () => {
    await notificationService.create(newNotification.value);
    newNotification.value = {
        title: '',
        message: '',
        createdAt: Date.now(),
    };
    await load();
}
</script>

<template>
    <h1>Notifications Page</h1>
    <button @click="load">Refresh</button>
    <hr>
    <div style="display: flex; gap: 10px; align-items: center; flex-direction: column;">
        <code>{{ newNotification }}</code>
        <Input v-model="newNotification.title" placeholder="Notification Title" />
        <Input v-model="newNotification.message" placeholder="Notification Message" />
        <button @click="createNotification">Add Notification</button>
    </div>

    <hr>
    <ul>
        <li v-for="notif in notifications" :key="notif.id">
            <button @click="deleteNotification(notif)">X</button>{{ notif.message }} - {{ notif.createdAt }}
        </li>
    </ul>
</template>