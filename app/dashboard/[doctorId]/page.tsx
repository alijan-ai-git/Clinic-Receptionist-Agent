"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const params = useParams();
  const doctorId = params?.doctorId as string;
  const router = useRouter();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const [form, setForm] = useState({
    patientName: "",
    patientNumber: "",
    patientReason: "",
  });

  // ---------------- FETCH ----------------
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/patients?doctorId=${doctorId}`);

      const data = await res.json();

      setPatients(data.patients || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DONE ----------------
  const markDone = async (id: string) => {
    await fetch(`/api/patients/done?id=${id}`, {
      method: "PATCH",
    });

    fetchPatients();
  };

  // ---------------- DELETE ----------------
  const deletePatient = async (id: string) => {
    await fetch(`/api/patients/delete?id=${id}`, {
      method: "DELETE",
    });

    fetchPatients();
  };

  // ---------------- EDIT OPEN ----------------
  const openEdit = (patient: Patient) => {
    setEditingPatient(patient);

    setForm({
      patientName: patient.patientName,
      patientNumber: patient.patientNumber,
      patientReason: patient.patientReason,
    });
  };

  // ---------------- UPDATE ----------------
  const updatePatient = async () => {
    if (!editingPatient) return;

    await fetch(`/api/patients/update?id=${editingPatient._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setEditingPatient(null);
    fetchPatients();
  };

  const createPatientRoute = () => {
    // the button is in the header and it will redirect to the new patient page

    router.push(`/dashboard/${doctorId}/new`);
  };

  useEffect(() => {
    if (doctorId) fetchPatients();
  }, [doctorId]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-zinc-400">Doctor ID: {doctorId}</p>
        </div>

        <button
          onClick={fetchPatients}
          className="bg-white text-black px-5 py-2 rounded-xl"
        >
          Refresh
        </button>
        <button
          onClick={createPatientRoute}
          className="bg-white text-black px-5 py-2 rounded-xl"
        >
          Add Patient
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {patients.map((p, index) => (
            <div
              key={p._id}
              className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 flex justify-between"
            >
              {/* LEFT */}
              <div>
                <p className="text-sm text-zinc-500">#{index + 1}</p>

                <h2 className="text-xl font-semibold">{p.patientName}</h2>

                <p className="text-zinc-400">{p.patientNumber}</p>

                <p className="text-zinc-300">{p.patientReason}</p>

                <p className="text-yellow-400 mt-2">{p.status}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 items-start">
                <button
                  onClick={() => markDone(p._id)}
                  className="bg-green-600 px-4 py-2 rounded-xl"
                >
                  Done
                </button>

                <button
                  onClick={() => openEdit(p)}
                  className="bg-blue-600 px-4 py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePatient(p._id)}
                  className="bg-red-600 px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {editingPatient && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-2xl w-[400px] space-y-4">
            <h2 className="text-xl font-semibold">Edit Patient</h2>

            <input
              className="w-full p-2 rounded bg-zinc-800"
              value={form.patientName}
              onChange={(e) =>
                setForm({
                  ...form,
                  patientName: e.target.value,
                })
              }
              placeholder="Name"
            />

            <input
              className="w-full p-2 rounded bg-zinc-800"
              value={form.patientNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  patientNumber: e.target.value,
                })
              }
              placeholder="Number"
            />

            <input
              className="w-full p-2 rounded bg-zinc-800"
              value={form.patientReason}
              onChange={(e) =>
                setForm({
                  ...form,
                  patientReason: e.target.value,
                })
              }
              placeholder="Reason"
            />

            <div className="flex gap-2">
              <button
                onClick={updatePatient}
                className="bg-green-600 px-4 py-2 rounded-xl"
              >
                Save
              </button>

              <button
                onClick={() => setEditingPatient(null)}
                className="bg-red-600 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
