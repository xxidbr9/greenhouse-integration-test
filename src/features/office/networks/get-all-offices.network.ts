import { NetworkType, ResponseType } from "@/@types/networks";
import { greenHouseApi, localApi } from "@/lib/networks";
import { OfficeType } from "../types/office";

export const getAllOffices = () => greenHouseApi.url("/v1/offices").get();

// PUBLIC
export const getAllOfficesPublic = () =>
  localApi.url("/offices").get() as NetworkType<OfficeType[]>;
