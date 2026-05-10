"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [doctorId, setDoctorId] = useState("");

  const enterDashboard = () => {
    if (!doctorId) {
      alert("ENTER DOCTOR ID");
      return;
    }

    router.push(`/dashboard/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-6 font-mono">
      {/* Macintosh Window */}
      <div className="w-full max-w-3xl bg-[#d6d6d6] border-4 border-black shadow-[12px_12px_0px_#000]">
        {/* TOP BAR */}
        <div className="bg-white border-b-4 border-black px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-black bg-white"></div>
            <div className="w-4 h-4 border-2 border-black bg-white"></div>
            <div className="w-4 h-4 border-2 border-black bg-white"></div>
          </div>

          <h1 className="font-bold tracking-widest text-sm">CLINIC OS 1984</h1>

          <div className="text-xs font-bold">ONLINE</div>
        </div>

        {/* CONTENT */}
        <div className="p-10">
          {/* HERO */}
          <div className="border-4 border-black bg-white p-8 mb-8">
            <p className="text-sm mb-2">AI POWERED CLINIC SYSTEM</p>

            <h1 className="text-5xl font-black leading-tight">
              Replace The Receptionist.
            </h1>

            <p className="mt-6 text-lg leading-relaxed">
              Queue management. Patient tracking. Doctor dashboard. One
              operating system for modern clinics.
            </p>
          </div>

          {/* TERMINAL BOX */}
          <div className="border-4 border-black bg-black text-green-400 p-6 mb-8">
            <p>{">"} SYSTEM STATUS: READY</p>
            <p>{">"} DATABASE CONNECTION: ACTIVE</p>
            <p>{">"} PATIENT QUEUE ENGINE: RUNNING</p>
            <p>{">"} WAITING FOR DOCTOR AUTHORIZATION...</p>
          </div>

          {/* LOGIN PANEL */}
          <div className="border-4 border-black bg-white p-8">
            <h2 className="text-2xl font-bold mb-6">ENTER DOCTOR ID</h2>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="e.g 12"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="flex-1 border-4 border-black px-4 py-4 text-xl outline-none bg-[#f5f5f5]"
              />

              <button
                onClick={enterDashboard}
                className="border-4 border-black bg-black text-white px-8 py-4 font-bold text-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                ACCESS
              </button>
            </div>

            <p className="mt-4 text-sm">
              No dashboard found? Register the clinic manually.
            </p>
          </div>

          {/* FOOTER */}
          <div className="mt-8 border-t-4 border-black pt-4 flex justify-between text-xs font-bold">
            <span>CLINIC AGENT v1.0</span>
            <span>RAWALPINDI, PAKISTAN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
