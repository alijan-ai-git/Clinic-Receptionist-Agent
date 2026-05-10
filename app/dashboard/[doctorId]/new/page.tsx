"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function NewPatient() {
  const params = useParams();
  const router = useRouter();

  const doctorId = params.doctorId as string;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    patientReason: "",
    status: "waiting",
  });

  const createPatient = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/createPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          doctorId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Failed to create patient");
        return;
      }

      router.push(`/dashboard/${doctorId}`);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-black flex items-center justify-center p-6 font-mono">
      {/* Macintosh Window */}
      <div className="w-full max-w-xl border-4 border-black bg-[#d6d6d6] shadow-[10px_10px_0px_#000]">
        {/* TOP BAR */}
        <div className="border-b-4 border-black bg-white px-4 py-2 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 border-2 border-black bg-white"></div>
            <div className="w-4 h-4 border-2 border-black bg-white"></div>
            <div className="w-4 h-4 border-2 border-black bg-white"></div>
          </div>

          <h1 className="font-bold tracking-wide text-sm">
            CLINIC OS — ADD PATIENT
          </h1>

          <div className="text-xs">DR #{doctorId}</div>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-6">
          {/* TITLE */}
          <div className="border-2 border-black bg-white p-4">
            <h2 className="text-2xl font-bold">New Patient Registration</h2>

            <p className="text-sm mt-2">
              Enter patient information into the clinic queue system.
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            {/* NAME */}
            <div className="space-y-2">
              <label className="text-sm font-bold">PATIENT NAME</label>

              <input
                type="text"
                placeholder="Enter patient name"
                value={form.patientName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    patientName: e.target.value,
                  })
                }
                className="w-full border-4 border-black bg-white px-4 py-3 outline-none text-lg"
              />
            </div>

            {/* PHONE */}
            <div className="space-y-2">
              <label className="text-sm font-bold">PHONE NUMBER</label>

              <input
                type="text"
                placeholder="0300XXXXXXX"
                value={form.patientPhone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    patientPhone: e.target.value,
                  })
                }
                className="w-full border-4 border-black bg-white px-4 py-3 outline-none text-lg"
              />
            </div>

            {/* REASON */}
            <div className="space-y-2">
              <label className="text-sm font-bold">VISIT REASON</label>

              <textarea
                placeholder="Describe the reason for visit..."
                value={form.patientReason}
                onChange={(e) =>
                  setForm({
                    ...form,
                    patientReason: e.target.value,
                  })
                }
                className="w-full border-4 border-black bg-white px-4 py-3 outline-none h-32 resize-none text-lg"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={createPatient}
              disabled={loading}
              className="flex-1 border-4 border-black bg-black text-white py-3 font-bold hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {loading ? "SAVING..." : "SAVE PATIENT"}
            </button>

            <button
              onClick={() => router.push(`/dashboard/${doctorId}`)}
              className="flex-1 border-4 border-black bg-white py-3 font-bold hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              CANCEL
            </button>
          </div>

          {/* FOOTER */}
          <div className="border-t-4 border-black pt-4 text-xs flex justify-between">
            <span>QUEUE STATUS: ACTIVE</span>
            <span>CLINIC SYSTEM READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
