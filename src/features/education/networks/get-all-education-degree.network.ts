import { NetworkType } from "@/@types/networks";
import { greenHouseApi, localApi } from "@/lib/networks";
import { EducationItemType } from "../types/education";

export const getAllDegrees = () => greenHouseApi.url("/v1/degrees").get();

// PUBLIC
export const getAllDegreesPublic = () =>
  localApi.url("/degrees").get() as NetworkType<EducationItemType[]>;
