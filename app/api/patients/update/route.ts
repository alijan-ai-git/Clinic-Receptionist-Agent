import { connectToDatabase } from "@/lib/db";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            body,
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