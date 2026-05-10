import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Patient from "@/models/Patient";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("doctorId");

    console.log("doctorId:", doctorId);

    const patients = await Patient.find({
      doctorId,
    }).sort({ createdAt: 1 });

    return NextResponse.json({
      success: true,
      patients,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}