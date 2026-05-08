"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [doctorId, setDoctorId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEnter = () => {
    setError("");

    if (!doctorId.trim()) {
      setError("Please enter doctor ID");
      return;
    }

    router.push(`/dashboard/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-[380px] bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
        <h1 className="text-2xl font-bold text-center mb-6">Doctor Portal</h1>

        <p className="text-zinc-400 text-sm text-center mb-6">
          Enter your Doctor ID to continue
        </p>

        <input
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          placeholder="Doctor ID (e.g. 12)"
          className="w-full p-3 rounded-xl bg-zinc-800 outline-none"
        />

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <button
          onClick={handleEnter}
          className="w-full mt-5 bg-white text-black py-3 rounded-xl font-medium hover:opacity-80 transition"
        >
          Enter Dashboard
        </button>

        <p className="text-zinc-500 text-xs text-center mt-6">
          If you don’t have an ID, contact admin.
        </p>
      </div>
    </div>
  );
}
