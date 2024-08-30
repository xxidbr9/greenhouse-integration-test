import { getAllOffices } from "@/features/office/networks";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await getAllOffices();
    return NextResponse.json(
      { message: "success get office data", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed get office data", error: err },
      { status: 400 },
    );
  }
}
