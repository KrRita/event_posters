import { useState } from "react";
import { useForm } from "react-hook-form";
import { HoldingEvent } from "~/types/HoldingEvent";
import DropDown from "./DropDown";
import { CreateHoldingEventRequest } from "~/types/CreateHoldingEventRequest";

type HoldingEventFormProps = {
  holdingEvent?: HoldingEvent;
  locations: string[];
  events: string[];
  onSubmit: (holdingEvent: CreateHoldingEventRequest) => void;
};

type Inputs = {
  description: string;
  price: number;
  rating: number;
};

export const HoldingEventForm = ({
  holdingEvent,
  locations,
  events,
  onSubmit,
}: HoldingEventFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [location, setLocation] = useState(
    holdingEvent?.location.name ?? "Не выбрано" ?? "",
  );
  const [event, setEvent] = useState(
    holdingEvent?.event.name ?? "Не выбрано" ?? "",
  );

  const createHoldingEvent = (inputs: Inputs) => {
    const newHoldingEvent = {
      event: {
        name: event,
      },
      description: inputs.description,
      ticketPrice: inputs.price,
      location: {
        name: location,
      },
      rating: inputs.rating,
    };
    onSubmit(newHoldingEvent);
  };

  return (
    <form
      onSubmit={handleSubmit(createHoldingEvent)}
      className="flex w-full flex-col gap-4 bg-[#900d0d] p-5 rounded-xl"
    >
      <div className="flex gap-4">
        <DropDown value={event} options={events} onChange={setEvent} />
      </div>
      <input
        type="number"
        placeholder="Цена билета"
        defaultValue={holdingEvent?.ticketPrice}
        className="rounded border p-2"
        {...register("price", { required: true, min: 0, valueAsNumber: true })}
      />
      <input
        type="number"
        placeholder="Рейтинг"
        defaultValue={holdingEvent?.rating}
        className="rounded border p-2"
        {...register("rating", { required: true, min: 0, max:10, valueAsNumber: true })}
      />
      <div className="flex gap-4">
        <DropDown value={location} options={locations} onChange={setLocation} />
      </div>
      <textarea
        placeholder="Описание"
        {...register("description", { required: true })}
        className="rounded border p-2"
        inputMode="text"
        defaultValue={holdingEvent?.description}
      />
      <input
        type="submit"
        value="Добавить/Изменить"
        className="rounded border bg-[#ffdbc5] p-2 text-2xl font-bold"
      />
    </form>
  );
};
