import DropDown from "./DropDown";
import React from "react";

type FiltersProps = {
  eventType: string;
  price: number | "";
  age: number | "";
  location: string | undefined;
  locations: string[];
  onEventTypeChange: (value: string) => void;
  onAgeChange: (value: number | "") => void;
  onPriceChange: (value: number | "") => void;
  onLocationChange: (value: string|undefined) => void;
};

export const Filter = ({
  eventType,
  price,
  age,
  location,
  locations,
  onEventTypeChange,
  onAgeChange,
  onPriceChange,
  onLocationChange,
}: FiltersProps) => {
  const handleEventTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    onEventTypeChange(value);
  };
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value == "" ? "" : event.target.valueAsNumber;
    onAgeChange(value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value == "" ? "" : event.target.valueAsNumber;
    onPriceChange(value);
  };
  const handleLocationChange = (value: string) => {
    if (value == "Не выбрано") {
      onLocationChange(undefined);
    } else {
      onLocationChange(value);
    }
  };

  return (
    <section className="flex w-full gap-3 rounded-xl bg-[#423144] p-4">
      <input
        className="pl-2 rounded-lg"
        placeholder="Тип мероприятия"
        value={eventType}
        onChange={handleEventTypeChange}
      />
      <input
        placeholder="Максимальная цена"
        type="number"
        min={1}
        value={price}
        className="pl-2 rounded-lg"
        onChange={handlePriceChange}
      />
      <input
        placeholder="Минимальный возраст"
        type="number"
        max={18}
        min={0}
        value={age}
        onChange={handleAgeChange}
        className="w-full pl-2 rounded-lg"
      />
      <DropDown
        options={[...locations, "Не выбрано"]}
        value={location ?? "Не выбрано"}
        onChange={handleLocationChange}
      />
    </section>
  );
};

export default Filter;
