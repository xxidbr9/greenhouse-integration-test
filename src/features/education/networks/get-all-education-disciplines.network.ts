import { NetworkType } from "@/@types/networks";
import { greenHouseApi, localApi } from "@/lib/networks";
import { EducationItemType } from "../types/education";

export const getAllDisciplines = () =>
  greenHouseApi.url("/v1/disciplines").get();

// PUBLIC
export const getAllDisciplinesPublic = () =>
  localApi.url("/disciplines").get() as NetworkType<EducationItemType[]>;
