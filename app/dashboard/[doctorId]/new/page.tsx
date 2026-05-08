"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function NewPatient() {
  const params = useParams();
  const router = useRouter();

  const doctorId = params.doctorId; // get doctorId from URL

  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    patientReason: "",
    status: "waiting",
  });

  const createPatient = async () => {
    await fetch("/api/createPatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        doctorId, // 🔥 AUTO FROM URL
      }),
    });

    router.push(`/dashboard/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-[400px] bg-zinc-900 p-6 rounded-2xl space-y-4">
        <h1 className="text-2xl font-bold">Add Patient</h1>

        <input
          placeholder="Name"
          className="w-full p-2 rounded bg-zinc-800"
          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
        />

        <input
          placeholder="Number"
          className="w-full p-2 rounded bg-zinc-800"
          onChange={(e) => setForm({ ...form, patientPhone: e.target.value })}
        />

        <input
          placeholder="Reason"
          className="w-full p-2 rounded bg-zinc-800"
          onChange={(e) => setForm({ ...form, patientReason: e.target.value })}
        />

        <button
          onClick={createPatient}
          className="w-full bg-white text-black py-2 rounded-xl font-medium"
        >
          Save Patient
        </button>
      </div>
    </div>
  );
}
