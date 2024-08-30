import { NetworkType, ResponseType } from "@/@types/networks";
import { greenHouseApi, localApi } from "@/lib/networks";
import { JobListItemType } from "../types/job-list";

export const getAllJobs = (req?: any) =>
  greenHouseApi.url("/v1/jobs").query(req).get();

// PUBLIC
type RequestParams = {
  page?: number;
  per_page?: number;
  office_id?: string;
  department_id?: string;
};
export const getAllJobsPublic = (req?: RequestParams) =>
  localApi
    .url("/jobs")
    .query(req ?? {})
    .get() as NetworkType<JobListItemType[]>;
