import { Location } from "~/types/Location";
import { apiInstance } from "./instance";

export const getLocations = () => {
    return apiInstance.get<Location[]>("/locations");
  };