import { NetworkType } from "@/@types/networks";
import { greenHouseApi, localApi } from "@/lib/networks";
import { CandidateType } from "../types/candidate";

export const getAllCandidate = () => greenHouseApi.url("/v1/candidates").get();

// PUBLIC
export const getAllCandidatePublic = () =>
  localApi.url("/candidates").get() as NetworkType<CandidateType[]>;
