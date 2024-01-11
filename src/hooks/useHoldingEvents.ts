import { useState } from "react";
import { api } from "~/api";
import { HoldingEvent } from "~/types/HoldingEvent";
import { HoldingEventsRequestParams } from "~/types/HoldingEventsRequestParams";
import { Page } from "~/types/Page";

export const useHoldingEvents = (
  initialHoldingEvents: Page<HoldingEvent[]>,
) => {
  const [holdingEvents, setHoldingEvents] = useState(initialHoldingEvents);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = async (params: HoldingEventsRequestParams) => {
    setIsLoading(true);

    try {
      const response = await api.holdingEvent.getHoldingEvents(params);

      setHoldingEvents(response.data);
    } catch {
      // Обработать ошибку, например показать ее через react-toastify
    }

    setIsLoading(false);
  };

  return { holdingEvents, isLoading, refetch };
};
