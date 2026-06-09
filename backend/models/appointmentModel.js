import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: String,
  doctorId: String,
  date: String,
});

export default mongoose.model("appointment", appointmentSchema);