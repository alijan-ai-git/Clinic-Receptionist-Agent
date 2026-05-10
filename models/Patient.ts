import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },

  patientPhone: {
    type: String,
    required: true,
    match: /^\d{10}$/,
  },

  patientReason: {
    type: String,
    required: true,
  },

  doctorId: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["waiting", "done","processing"],
    default: "waiting",
  },
}, { timestamps: true });

export default mongoose.models.Patient ||
mongoose.model("Patient", patientSchema);