import { getAllSchools } from "@/features/education/networks";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await getAllSchools();
    return NextResponse.json(
      { message: "success get schools data", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed get schools data", error: err },
      { status: 400 },
    );
  }
}
