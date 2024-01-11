import { HoldingEvent } from "~/types/HoldingEvent";
import { apiInstance } from "./instance";
import { HoldingEventsRequestParams } from "~/types/HoldingEventsRequestParams";
import { Page } from "~/types/Page";
import { CreateHoldingEventRequest } from "~/types/CreateHoldingEventRequest";

export const getHoldingEvents = (params?: HoldingEventsRequestParams) => {
  return apiInstance.get<Page<HoldingEvent[]>>("/holding_events", {
    params,
    paramsSerializer: { dots: true },
  });
};

export const getHoldingEventById = (id: number) => {
  return apiInstance.get<HoldingEvent>(`/holding_events/${id}`);
};

export const addHoldingEvent = (holdingEvent: CreateHoldingEventRequest) => {
  return apiInstance.post("/holding_events", holdingEvent);
};

export const updateHoldingEvent = (id: number, holdingEvent: CreateHoldingEventRequest) => {
  return apiInstance.put(`/holding_events/${id}`, holdingEvent);
};

export const deleteHoldingEvent = (id: number) => {
  return apiInstance.delete(`/holding_events/${id}`);
};
