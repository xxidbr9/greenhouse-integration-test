import { getAllDegrees } from "@/features/education/networks";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await getAllDegrees();
    return NextResponse.json(
      { message: "success get degrees data", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed get degrees data", error: err },
      { status: 400 },
    );
  }
}
