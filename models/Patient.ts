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
    minlength: 10,
    maxlength: 10
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
    enum: ["waiting", "done"],
    default: "waiting",
  },
}, { timestamps: true });

export default mongoose.models.Patient ||
mongoose.model("Patient", patientSchema);