import { NetworkType } from "@/@types/networks";
import { greenHouseApi, localApi } from "@/lib/networks";
import { EducationItemType } from "../types/education";

export const getAllSchools = () => greenHouseApi.url("/v1/schools").get();

// PUBLIC
export const getAllSchoolsPublic = () =>
  localApi.url("/schools").get() as NetworkType<EducationItemType[]>;
