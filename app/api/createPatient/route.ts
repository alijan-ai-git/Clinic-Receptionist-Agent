import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Patient from "@/models/Patient";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    // console.log("BODY:", body);

    const {
      patientName,
      patientPhone,
      patientReason,
      status,
      doctorId,
    } = body;

    await connectToDatabase();

    const newPatient = new Patient({
      patientName,
      patientPhone,
      patientReason,
      status,
      doctorId,
    });

    await newPatient.save();

    return NextResponse.json({
      success: true,
      patient: newPatient,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}