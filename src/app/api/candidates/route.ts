import { getAllCandidate } from "@/features/candidate/networks/get-all-candidate.network";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await getAllCandidate();
    return NextResponse.json(
      { message: "success get candidate data", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed get candidate data", error: err },
      { status: 400 },
    );
  }
}
