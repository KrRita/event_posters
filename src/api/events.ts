import { apiInstance } from "./instance";
import { Event } from "~/types/Event";

export const getEvents = () => {
    return apiInstance.get<Event[]>("/events");
  };