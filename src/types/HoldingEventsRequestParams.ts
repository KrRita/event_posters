export type HoldingEventsSort = "ASC" | "DESC";
export type HoldingEventsLimit = "5" | "10" | "20";
export type HoldingEventSortField =
  | "rating"
  | "event.ageViewer"
  | "ticketPrice"
  | undefined;

export type HoldingEventsRequestParams = {
  pageNumber: number;
  pageSize: number;
  sortDirection?: HoldingEventsSort;
  sortBy?: HoldingEventSortField;

  eventType?: string;
  ticketPrice?: number;
  ageViewer?: number;
  location?: {name?: string};
};
