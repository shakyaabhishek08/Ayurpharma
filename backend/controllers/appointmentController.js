import appointmentModel from "../models/appointmentModel.js";

export const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    const appointment = new appointmentModel({
      userId,
      doctorId,
      date,
      time,
    });

    await appointment.save();

    res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};