import type { NotificationDTO } from "@/core/dto/NotificationDTO";
import { notificationService } from "@/core/services/notification.service";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

/**
 * Notification Store
 * @description Store to manage notifications in the application.
 * 
 * @methods
 * - addNotification: Add a new notification.
 * - removeNotification: Remove a notification.
 * - clearNotifications: Clear all notifications.
 * - getNotifications: Get the list of all notifications.
 */
const useNotificationStore = defineStore('notification', () => {

    const notifications = ref<NotificationDTO[]>([]);
    const loading = ref<boolean>(false);
    const feedbackMessage = ref<string>('');
    const count = computed(() => notifications.value.length);

    const addNotification = async (notification: Omit<NotificationDTO, 'id' | 'createdAt'>) => {
        const payload: Omit<NotificationDTO, 'id'> = {
            ...notification,
            createdAt: Date.now()
        };
        loading.value = true;
        await notificationService.create(payload);
        loading.value = false;
        feedbackMessage.value = 'Notification added successfully';
    };

    const removeNotification = async (notification: NotificationDTO) => {
        loading.value = true;
        await notificationService.delete(notification);
        notifications.value = notifications.value.filter(n => n.id !== notification.id);
        loading.value = false;
        feedbackMessage.value = 'Notification removed successfully';
    };

    const clearNotifications = async () => {   
        loading.value = true;
        notifications.value.forEach(async (notification) => {
            await notificationService.delete(notification);
        });
        notifications.value = [];
        loading.value = false;
        feedbackMessage.value = 'All notifications cleared successfully'; 
    };

    const getNotifications = async () => { 
        loading.value = true;
        notifications.value = await notificationService.read();
        loading.value = false;
        feedbackMessage.value = 'Notifications fetched successfully';
    };


    return {
        notifications,
        loading,
        feedbackMessage,
        addNotification,
        removeNotification,
        clearNotifications,
        getNotifications
    }
});
// const useNotificationStore = defineStore('notification', {})
