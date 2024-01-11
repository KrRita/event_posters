import { GetServerSideProps } from "next";
import { getEvents } from "~/api/events";
import { addHoldingEvent } from "~/api/holdingsEvents";
import { getLocations } from "~/api/locations";
import { HoldingEventForm } from "~/components/HoldingEventForm";
import { CreateHoldingEventRequest } from "~/types/CreateHoldingEventRequest";
import { HoldingEvent } from "~/types/HoldingEvent";

type AddHoldingEventProps = {
  locations: string[];
  events: string[];
};

export const AddHoldingEvent = ({
  locations,
  events,
}: AddHoldingEventProps) => {
  const handleFormSubmit = (holdingEvent: CreateHoldingEventRequest) => {
    addHoldingEvent(holdingEvent);
    window.location.replace("/");
  };
  return <HoldingEventForm locations={locations} events={events} onSubmit={handleFormSubmit} />;
};

export const getServerSideProps: GetServerSideProps<
  AddHoldingEventProps
> = async () => {
  const locations = getLocations();
  const events = getEvents();
  return {
    props: {
      locations: (await locations).data.map((x) => x.name),
      events: (await events).data.map((x) => x.name),
    },
  };
};

export default AddHoldingEvent;
