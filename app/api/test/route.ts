import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    await connectToDatabase();

    return NextResponse.json({
      success: true,
      message: "Database connected successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}