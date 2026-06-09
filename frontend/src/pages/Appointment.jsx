import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // 🔥 BOOK APPOINTMENT FUNCTION
  const bookAppointment = async () => {
    try {
      if (!slotTime) {
        alert("Please select a time slot");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Your Appointment is Booked");
        return;
      }

      const res = await axios.post(
        "http://localhost:4000/api/appointment/book",
        {
          userId: token,
          doctorId: docId,
          date: docSlots[slotIndex][0].datetime,
          time: slotTime,
        }
      );

      if (res.data.success) {
        toast.success("Appointment booked successfully ✅");
        // alert("Appointment booked successfully ✅");
      } else {
        alert(res.data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Error booking appointment ❌");
    }
  };

  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [doctors, docId]);

  return (
    docInfo && (
      <div>
        {/* doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
          />

          <div className="flex-1 border p-8 bg-white">
            <p className="text-2xl font-medium">
              {docInfo.name}
            </p>

            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <p className="mt-3">{docInfo.about}</p>

            <p className="mt-4">
              Fee: {currencySymbol}{docInfo.fees}
            </p>
          </div>
        </div>

        {/* slots */}
        <div className="mt-6">
          <p>Select Date</p>

          <div className="flex gap-3">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`p-3 cursor-pointer ${
                  slotIndex === index ? "bg-blue-500 text-white" : "border"
                }`}
              >
                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
              </div>
            ))}
          </div>

          <p className="mt-4">Select Time</p>

          <div className="flex gap-2 flex-wrap">
            {docSlots[slotIndex]?.map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-3 py-1 border ${
                  slotTime === item.time ? "bg-blue-500 text-white" : ""
                }`}
              >
                {item.time}
              </button>
            ))}
          </div>

          {/* 🔥 FIXED BUTTON */}
          <button
            onClick={bookAppointment}
            className="bg-primary text-white px-6 py-3 mt-6"
          >
            Book Appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;