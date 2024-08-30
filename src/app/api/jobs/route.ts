// import { getAllOffices } from '@/features/office/networks';
import { getAllJobs } from "@/features/job/networks/get-all-jobs.network";
import { NextResponse } from "next/server";

type RequestParams = {
  page?: number;
  per_page?: number;
  office_id?: string;
  department_id?: string;
};
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const per_page = url.searchParams.get("per_page");
    const page = url.searchParams.get("page");

    const office_id = url.searchParams.get("office_id");
    const department_id = url.searchParams.get("department_id");

    const params: RequestParams = {
      per_page: per_page ? parseInt(per_page, 10) : 10,
      office_id: office_id || undefined,
      department_id: department_id || undefined,
      page: page ? parseInt(page, 10) : 1,
    };

    const resp = await getAllJobs(params);
    return NextResponse.json(
      { message: "success get jobs data", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed get jobs data", error: err },
      { status: 400 },
    );
  }
}
