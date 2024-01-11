export type HoldingEvent = {
  id?: number;
  event: {
    eventType: string;
    name: string;
    ageViewer: number;
  };
  description: string;
  ticketPrice: number;
  location: {
    name: string;
  };
  date?: Date;
  rating: number;
};
