import { attachCV } from "@/features/application/networks/attach-cv.network";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resp = await attachCV(body);

    return NextResponse.json(
      { message: "success attach cv", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed attach cv", error: err },
      { status: 400 },
    );
  }
}
