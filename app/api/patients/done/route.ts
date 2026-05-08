import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import Patient from "@/models/Patient";

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      {
        status: "done",
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      updatedPatient,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}