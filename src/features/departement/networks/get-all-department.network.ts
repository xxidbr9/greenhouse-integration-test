import { NetworkType } from "@/@types/networks";
import { greenHouseApi, localApi } from "@/lib/networks";
import { DepartmentType } from "../types/department";

export const getAllDepartments = () =>
  greenHouseApi.url("/v1/departments").get();

// PUBLIC
export const getAllDepartmentsPublic = () =>
  localApi.url("/departments").get() as NetworkType<DepartmentType[]>;
