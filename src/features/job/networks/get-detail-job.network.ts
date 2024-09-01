import { NetworkType } from "@/@types/networks";
import { greenHouseApi, localApi } from "@/lib/networks";
import { JobDetailType } from "../types/job-detail";
import { JobListItemType } from "../types/job-list";

export const getDetailJobs = (req?: { id: string }) =>
  greenHouseApi.url(`/v1/jobs/${req?.id}/job_post`).get();

export const getDetailJob = (req?: { id: string }) =>
  greenHouseApi.url(`/v1/jobs/${req?.id}`).get();

// PUBLIC
export const getDetailJobsPublic = (id: string) =>
  localApi.url(`/jobs/${id}`).get() as NetworkType<{
    job_post_detail: JobDetailType;
    job_detail: JobListItemType;
  }>;
