import type { NotificationDTO } from "../dto/NotificationDTO";
import type { ENDPOINTS } from "../types/pattern.type";
import { CrudAbstract } from "./crud.abstract";

class NotificationService extends CrudAbstract<NotificationDTO>{
    API:ENDPOINTS = '/notifications'
}

export const notificationService = new NotificationService();
