import { greenHouseApi, localApi } from "@/lib/networks";

export const getDetailJobs = (req?: { id: string }) =>
  greenHouseApi.url(`/v1/jobs/${req?.id}/job_post`).get();

// PUBLIC
export const getDetailJobsPublic = (id: string) =>
  localApi.url(`/jobs/${id}`).get();
