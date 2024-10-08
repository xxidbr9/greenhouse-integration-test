import { applyJob } from "@/features/application/networks/apply-job.network";
import { attachCV } from "@/features/application/networks/attach-cv.network";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resp = await applyJob(body);

    return NextResponse.json(
      { message: "success apply job", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed apply job", error: err },
      { status: 400 },
    );
  }
}
