// import { getAllOffices } from '@/features/office/networks';
import { getAllJobs } from "@/features/job/networks/get-all-jobs.network";
import {
  getDetailJob,
  getDetailJobs,
} from "@/features/job/networks/get-detail-job.network";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const splitUrl = url.pathname.split("/");
    const id = splitUrl[splitUrl.length - 1];
    const [job_post_detail, job_detail] = await Promise.all([
      getDetailJobs({ id }),
      getDetailJob({ id }),
    ]);
    return NextResponse.json(
      {
        message: "success get job data",
        data: { job_post_detail, job_detail },
      },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed get job data", error: err },
      { status: 400 },
    );
  }
}
