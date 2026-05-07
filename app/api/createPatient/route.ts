import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Patient from "@/models/Patient";

export async function POST( request: Request) {
    try {
        const {
            patientName,
            patientPhone,
            patientReason,
            status,
            doctorId,
        } = await request.json();

        await connectToDatabase();
        const newPatient = new Patient({
            patientName,
            patientPhone,
            patientReason,
            status,
            doctorId
        });
        await newPatient.save();

        return NextResponse.json(newPatient, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({ error }, {
            status: 500
        });
    }
}