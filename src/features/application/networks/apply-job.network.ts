import { greenHouseApi, localApi } from "@/lib/networks";
import { ApplyType } from "../types/apply";
import { NetworkType } from "@/@types/networks";
import { ApplyRespType } from "../types/apply-network";

export const applyJob = (args: any) =>
  greenHouseApi.url(`/v1/candidates`).json(args).post();

// PUBLIC
export const applyJobPublic = (args: ApplyType) =>
  localApi.url("/apply").json(args).post() as NetworkType<ApplyRespType>;
