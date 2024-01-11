export type CreateHoldingEventRequest = {
    event: {
      name: string;
    };
    description: string;
    ticketPrice: number;
    location: {
      name: string;
    };
    rating: number;
  };
  