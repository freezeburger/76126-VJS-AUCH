import type { LongText, ShortText, WithUniqueId } from "../types/generic.type";

export interface NotificationDTO extends WithUniqueId{
  title: ShortText;
  message: LongText;
  createdAt: number;
}