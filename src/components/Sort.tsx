import {
  HoldingEventSortField,
  HoldingEventsSort,
} from "~/types/HoldingEventsRequestParams";
import DropDown from "./DropDown";

type SortProps = {
  direction: HoldingEventsSort;
  field: HoldingEventSortField;
  onDirectionChanged: (value: HoldingEventsSort) => void;
  onFieldChanged: (value: HoldingEventSortField) => void;
};

const convertEventSortToReadeable = (field: HoldingEventSortField) => {
  switch (field) {
    case "rating":
      return "Рейтинг";
    case "event.ageViewer":
      return "Возраст";
    case "ticketPrice":
      return "Цена";

    default:
      return "Не выбрано";
  }
};

const convertReadeableToField = (
  value: "Возраст" | "Рейтинг" | "Цена" |"Не выбрано",
) => {
  switch (value) {
    case "Возраст":
      return "event.ageViewer";
    case "Рейтинг":
      return "rating";
    case "Цена":
      return "ticketPrice";

    default:
      return undefined;
  }
};

const convertDirectionToReadeable = (value: HoldingEventsSort) => {
  if (value == "ASC") {
    return "По возрастанию";
  }
  return "По убыванию";
};

const convertReadeableToDirection = (
  value: "По возрастанию" | "По убыванию",
) => {
  if (value == "По возрастанию") {
    return "ASC";
  }
  return "DESC";
};

export const Sort = ({
  direction,
  field,
  onDirectionChanged,
  onFieldChanged,
}: SortProps) => {
  const handleSortFieldChange = (
    value: "Возраст" | "Рейтинг" | "Цена" | "Не выбрано",
  ) => {
    onFieldChanged(convertReadeableToField(value));
  };

  const handleSortDirectionChange = (
    value: "По возрастанию" | "По убыванию",
  ) => {
    onDirectionChanged(convertReadeableToDirection(value));
  };

  return (
    <div className="flex gap-3 rounded-xl bg-[#423144] p-3">
      <DropDown
        value={convertEventSortToReadeable(field)}
        options={["Возраст", "Рейтинг", "Цена", "Не выбрано"]}
        onChange={handleSortFieldChange}
      />
      <DropDown
        value={convertDirectionToReadeable(direction)}
        options={["По возрастанию", "По убыванию"]}
        onChange={handleSortDirectionChange}
      />
    </div>
  );
};

export default Sort;
