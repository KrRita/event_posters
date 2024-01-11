import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "~/api";
import { HoldingEvent } from "~/types/HoldingEvent";

type HoldingEventPageProps = {
  holdingEvent: HoldingEvent;
  id: number;
};

const HoldingEventPage = ({ holdingEvent, id }: HoldingEventPageProps) => {
  const router = useRouter();
  function handleDelete(event: React.MouseEvent<HTMLButtonElement>): void {
    api.holdingEvent.deleteHoldingEvent(id);
    router.replace("/");
  }

  return (
    <>
      <Head>
        <title>{holdingEvent.event.name}</title>
      </Head>
      <section>
        <div className="my-10 w-full rounded-lg bg-[#900d0d] px-3 pb-3 pt-3 text-xl text-[#ffdbc5]">
        <div className="my-4 mx-4 rounded-lg bg-[#ffdbc5] px-3 pb-3 pt-3 text-xl text-black">
          <div className="mx-auto text-3xl font-semibold text-[#5f0707]">
            {holdingEvent.event.name}
          </div>
          <div className="mx-auto">
            {holdingEvent.event.eventType} {holdingEvent.event.ageViewer} +
          </div>
          <div className="mx-auto">
            {holdingEvent.description}
            <br />
          </div>
          <div className="mx-auto">
            Место проведения: {holdingEvent.location.name}
          </div>
          <div className="mx-auto">
            Цена билета: {holdingEvent.ticketPrice} р.
          </div>
          <div className="mx-auto">Рейтинг: {holdingEvent.rating}&#9733;</div>
        </div>
        </div>
      </section>
      <div className="flex flex-row gap-3">
      <div className="w-full h-full p-2 bg-[#900d0d] mb-5 text-center text-[#ffdbc5] text-2xl rounded-lg">
      <Link href={`/holdingEvent/update/${holdingEvent.id}`}>Изменить</Link>
      </div>
      <button
        onClick={handleDelete}
        className="w-full h-full bg-[#900d0d] text-[#ffdbc5] p-2 text-2xl rounded-lg"
      >
        Удалить мероприятие
      </button>
      </div>
    </>
  );
};

export default HoldingEventPage;

export const getServerSideProps: GetServerSideProps<
  HoldingEventPageProps
> = async (ctx) => {
  const { params } = ctx;

  const id = params?.id;

  if (typeof id !== "string") {
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

  const response = await api.holdingEvent.getHoldingEventById(numberId);

  return { props: { holdingEvent: response.data, id: numberId } };
};
