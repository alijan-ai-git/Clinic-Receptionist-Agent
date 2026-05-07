import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import Patient from "@/models/Patient";


export async function DELETE(request: Request, { params }: { params: { patientName: string } }) {
    try {
        await connectToDatabase();

        const patientName = params.patientName;
        console.log("patientName:", patientName);

        const result = await Patient.findOneAndDelete({ patientName });

        return NextResponse.json({
            success: true,
            result,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error,
        });
    }
}