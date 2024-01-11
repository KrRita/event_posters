import { GetServerSideProps } from "next";
import { api } from "~/api";
import { getEvents } from "~/api/events";
import { getLocations } from "~/api/locations";
import { HoldingEventForm } from "~/components/HoldingEventForm";
import { CreateHoldingEventRequest } from "~/types/CreateHoldingEventRequest";
import { HoldingEvent } from "~/types/HoldingEvent";

type HoldingEventUpdatePageProps = {
    id: number;
    holdingEvent: HoldingEvent;
    locations: string[];
    events:string[];
  };
  
  const HoldingEventUpdatePage = ({id, holdingEvent, locations, events }: HoldingEventUpdatePageProps) => {
    const handleSubmitForm = (newHoldingEvent: CreateHoldingEventRequest) => {
      api.holdingEvent.updateHoldingEvent(id, newHoldingEvent);
      window.location.replace("/");
    };
  
    return (
      <HoldingEventForm
        holdingEvent={holdingEvent}
        locations={locations}
        events={events}
        onSubmit={handleSubmitForm}
      />
    );
  };
  
  export const getServerSideProps: GetServerSideProps<HoldingEventUpdatePageProps> = async (
    ctx,
  ) => {
    const { params } = ctx;
    const id = params?.id;
  
    if (typeof id != "string") {
      return {
        notFound: true,
      };
    }
    const numberId = parseInt(id);
  
    if (Number.isNaN(numberId)) {
      return {
        notFound: true,
      };
    }
    const response = api.holdingEvent.getHoldingEventById(numberId);
    const locationsResponse = getLocations();
    const eventsResponse = getEvents();
  
    return {
      props: {
        id: numberId,
        holdingEvent: (await response).data,
        events: (await eventsResponse).data.map((x) => x.name),
        locations: (await locationsResponse).data.map((x) => x.name),
      },
    };
  };
  
  export default HoldingEventUpdatePage;
  