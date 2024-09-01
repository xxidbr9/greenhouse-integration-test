import { getAllDisciplines } from "@/features/education/networks";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await getAllDisciplines();
    return NextResponse.json(
      { message: "success get disciplines data", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed get disciplines data", error: err },
      { status: 400 },
    );
  }
}
