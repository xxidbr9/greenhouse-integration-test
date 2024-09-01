import { greenHouseApi, localApi } from "@/lib/networks";

type RequestArgsType = {
  id: number;
  filename: string;
  type: string;
  content: string;
  content_type: string;
};

export const attachCV = ({ id, ...args }: RequestArgsType) =>
  greenHouseApi.url(`/v1/applications/${id}/attachments`).json(args).post();

// PUBLIC
export const attachCVPublic = (args: RequestArgsType) =>
  localApi.url("/apply/attach").json(args).post();
