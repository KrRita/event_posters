import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { number } from "zod";
import { api } from "~/api";
import { getLocations } from "~/api/locations";
import { Filter } from "~/components/Filters";
import { HoldingEventCard } from "~/components/HoldingEventCard";
import { Pagination } from "~/components/Pagination";
import Sort from "~/components/Sort";
import { useHoldingEvents } from "~/hooks";
import { HoldingEvent } from "~/types/HoldingEvent";
import {
  HoldingEventSortField,
  HoldingEventsSort,
} from "~/types/HoldingEventsRequestParams";
import { Page } from "~/types/Page";

type HomeProps = {
  holdingEvents: Page<HoldingEvent[]>;
  locations: string[];
};

export const Home = ({
  holdingEvents: initialProducts,
  locations,
}: HomeProps) => {
  const { holdingEvents, isLoading, refetch } =
    useHoldingEvents(initialProducts);
  const [location, setLocation] = useState<string|undefined>(undefined);
  const [eventType, setEventType] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [pageNumber, setPageNumber] = useState(initialProducts.number);
  const [totalPagesCount, setTotaPagesCount] = useState(
    initialProducts.totalPages,
  );

  const [sortField, setSortField] =
    useState<HoldingEventSortField>(undefined);

  const [sortDirection, setStortDirection] =
    useState<HoldingEventsSort>("DESC");

  const createRequest = (page: number = pageNumber) => {
    return {
      pageNumber: page,
      pageSize: 5,
      sortDirection: sortDirection,
      sortBy: sortField,
      eventType: eventType == "" ? undefined : eventType,
      ticketPrice: price == "" ? undefined : price,
      ageViewer: age == "" ? undefined : age,
      location: location == "" ? undefined : {name: location},
    };
  };

  const handleApplyButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    refetch(createRequest());
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page - 1);
    refetch(createRequest(page - 1));
  };

  return (
    <>
      <Head>
        <title>Главная</title>
        <meta name="description" content="Главная" />
      </Head>
      <div className="flex flex-wrap gap-4">
        <Filter
          age={age}
          eventType={eventType}
          location={location}
          price={price}
          locations={locations}
          onLocationChange={setLocation}
          onAgeChange={setAge}
          onEventTypeChange={setEventType}
          onPriceChange={setPrice}
        />
        <Sort
          direction={sortDirection}
          field={sortField}
          onDirectionChanged={setStortDirection}
          onFieldChanged={setSortField}
        />
        <button className="bg-[#900d0d] px-4 rounded-lg text-[#ffdbc5] text-lg font-bold" onClick={handleApplyButtonClick}>Применить</button>
      </div>
      <section className="mt-4 rounded-xl bg-[#900d0d] p-4 px-7">
        {holdingEvents?.content.map((h) => (
          <HoldingEventCard key={h.id} holdingEvent={h} />
        ))}
      </section>
      <Pagination
        currentPage={Math.min(pageNumber+1, holdingEvents.totalPages)}
        onPageChanged={handlePageChange}
        totalPages={holdingEvents.totalPages}
      />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const data = await api.holdingEvent.getHoldingEvents({
    pageNumber: 0,
    pageSize: 10,
  });
  const locations = await getLocations();
  console.log(data);
  return {
    props: {
      holdingEvents: data.data,
      locations: locations.data.map((x) => x.name),
    },
  };
};
