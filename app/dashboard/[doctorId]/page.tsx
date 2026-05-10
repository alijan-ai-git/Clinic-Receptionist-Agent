"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Patient {
  _id: string;
  patientName: string;
  patientPhone: string;
  patientReason: string;
  status: string;
}

export default function DoctorDashboard() {
  const params = useParams();
  const doctorId = params?.doctorId as string;

  const router = useRouter();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
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
      patientPhone: patient.patientPhone,
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

  // ---------------- NEW PATIENT PAGE ----------------
  const createPatientRoute = () => {
    router.push(`/dashboard/${doctorId}/new`);
  };

  // ---------------- CALL NEXT PATIENT ----------------
  const callNextPatient = async () => {
    const nextPatient = patients.find((p) => p.status === "waiting");

    if (!nextPatient) {
      alert("No waiting patients");
      return;
    }

    await fetch(`/api/patients/update?id=${nextPatient._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "processing",
      }),
    });

    fetchPatients();
  };

  // ---------------- METRICS ----------------
  const waitingCount = patients.filter((p) => p.status === "waiting").length;

  const processingCount = patients.filter(
    (p) => p.status === "processing",
  ).length;

  const doneCount = patients.filter((p) => p.status === "done").length;

  // ---------------- AUTO REFRESH ----------------
  useEffect(() => {
    if (!doctorId) return;

    fetchPatients();

    const interval = setInterval(() => {
      fetchPatients();
    }, 1000000);

    return () => clearInterval(interval);
  }, [doctorId]);

  return (
    <div className="min-h-screen bg-[#808080] text-black font-mono p-10">
      {/* HEADER */}
      <div
        className="
          bg-[#c0c0c0]
          border-4
          border-t-white
          border-l-white
          border-r-black
          border-b-black
          p-6
          mb-10
          shadow-[8px_8px_0px_#000]
        "
      >
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold uppercase">
              Clinic Queue Control Center
            </h1>

            <p className="mt-2">Doctor ID: {doctorId}</p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div>Total Patients: {patients.length}</div>

              <div>Waiting: {waitingCount}</div>

              <div>Processing: {processingCount}</div>

              <div>Completed: {doneCount}</div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={fetchPatients}
              className="
                bg-[#c0c0c0]
                border-2
                border-t-white
                border-l-white
                border-r-black
                border-b-black
                px-5
                py-2
                font-bold
                active:border-t-black
                active:border-l-black
                active:border-r-white
                active:border-b-white
              "
            >
              REFRESH
            </button>

            <button
              onClick={createPatientRoute}
              className="
                bg-[#c0c0c0]
                border-2
                border-t-white
                border-l-white
                border-r-black
                border-b-black
                px-5
                py-2
                font-bold
              "
            >
              REGISTER PATIENT
            </button>

            <button
              onClick={callNextPatient}
              className="
                bg-[#c0c0c0]
                border-2
                border-t-white
                border-l-white
                border-r-black
                border-b-black
                px-5
                py-2
                font-bold
              "
            >
              CALL NEXT
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-xl">Loading clinic queue...</p>
      ) : (
        <div className="space-y-5">
          {patients.map((p, index) => {
            if (p.status !== "waiting" && p.status !== "processing") {
              return null;
            }

            return (
              <div
                key={p._id}
                className="
                  bg-[#d6d3ce]
                  border-4
                  border-t-white
                  border-l-white
                  border-r-black
                  border-b-black
                  p-5
                  flex
                  justify-between
                  items-start
                  shadow-[6px_6px_0px_#000]
                "
              >
                {/* LEFT */}
                <div>
                  <p className="text-sm uppercase">
                    Queue Position #{index + 1}
                  </p>

                  <h2 className="text-3xl font-bold mt-1 uppercase">
                    {p.patientName}
                  </h2>

                  <p className="mt-2">Number: {p.patientPhone}</p>

                  <p>Reason: {p.patientReason}</p>

                  <p className="mt-3 font-bold uppercase">Status: {p.status}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 flex-wrap">
                  {p.status === "processing" && (
                    <button
                      onClick={() => markDone(p._id)}
                      className="
                        bg-[#c0c0c0]
                        border-2
                        border-t-white
                        border-l-white
                        border-r-black
                        border-b-black
                        px-4
                        py-2
                        font-bold
                      "
                    >
                      DONE
                    </button>
                  )}

                  <button
                    onClick={() => openEdit(p)}
                    className="
                      bg-[#c0c0c0]
                      border-2
                      border-t-white
                      border-l-white
                      border-r-black
                      border-b-black
                      px-4
                      py-2
                      font-bold
                    "
                  >
                    EDIT
                  </button>

                  <button
                    onClick={() => deletePatient(p._id)}
                    className="
                      bg-[#c0c0c0]
                      border-2
                      border-t-white
                      border-l-white
                      border-r-black
                      border-b-black
                      px-4
                      py-2
                      font-bold
                    "
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT MODAL */}
      {editingPatient && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div
            className="
              bg-[#c0c0c0]
              border-4
              border-t-white
              border-l-white
              border-r-black
              border-b-black
              p-6
              w-[400px]
              space-y-4
            "
          >
            <h2 className="text-2xl font-bold uppercase">Edit Patient</h2>

            <input
              className="
                w-full
                p-2
                bg-white
                border-2
                border-black
              "
              value={form.patientName}
              onChange={(e) =>
                setForm({
                  ...form,
                  patientName: e.target.value,
                })
              }
              placeholder="Patient Name"
            />

            <input
              className="
                w-full
                p-2
                bg-white
                border-2
                border-black
              "
              value={form.patientNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  patientNumber: e.target.value,
                })
              }
              placeholder="Patient Number"
            />

            <input
              className="
                w-full
                p-2
                bg-white
                border-2
                border-black
              "
              value={form.patientReason}
              onChange={(e) =>
                setForm({
                  ...form,
                  patientReason: e.target.value,
                })
              }
              placeholder="Reason"
            />

            <div className="flex gap-3">
              <button
                onClick={updatePatient}
                className="
                  bg-[#c0c0c0]
                  border-2
                  border-t-white
                  border-l-white
                  border-r-black
                  border-b-black
                  px-5
                  py-2
                  font-bold
                "
              >
                SAVE
              </button>

              <button
                onClick={() => setEditingPatient(null)}
                className="
                  bg-[#c0c0c0]
                  border-2
                  border-t-white
                  border-l-white
                  border-r-black
                  border-b-black
                  px-5
                  py-2
                  font-bold
                "
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
