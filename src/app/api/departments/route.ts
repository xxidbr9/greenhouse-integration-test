import { getAllDepartments } from "@/features/departement/networks";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await getAllDepartments();
    return NextResponse.json(
      { message: "success get departments data", data: resp },
      { status: 200 },
    );
  } catch (e) {
    const err = e;
    return NextResponse.json(
      { message: "failed get departments data", error: err },
      { status: 400 },
    );
  }
}
