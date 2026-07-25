"use client";

import { useEffect, useState } from "react";

type Booking = {
  booking_time: string;
  duration?: number;
};

export default function ViewSlots({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  selectedTime: string;
  setSelectedTime: (v: string) => void;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate all 24 hours
  const ALL_SLOTS = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  // ✅ FETCH BOOKINGS FROM SUPABASE (via API)
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/bookings?date=${selectedDate}`);
      const data = (await response.json()) as Booking[];

      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedDate) return;

    void fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

    // ✅ CHECK IF SLOT IS BOOKED
    const isBooked = (slot: string) => {
    const slotHour = Number(slot.split(":")[0]);

    return bookings.some((booking) => {
      const startHour = Number(booking.booking_time.split(":")[0]);
      const durationHours = (booking.duration || 60) / 60;
      const endHour = startHour + durationHours;

      return slotHour >= startHour && slotHour < endHour;
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-[#b12526] mb-4">
        View Available Slots
      </h2>

      {/* DATE */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-black">
          Select Date
        </label>

        <input
          type="date"
          value={selectedDate || ""}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTime("");
          }}
          className="w-full p-3 border border-black/50 rounded-2xl bg-white text-black"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500 mb-4">
          Loading slots...
        </p>
      )}

      {/* TIME SELECT */}
      {!loading && selectedDate && (
        <div>
          <label className="block mb-2 font-medium text-black">
            Select Time
          </label>

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 border border-black/50 rounded-2xl bg-white text-black"
          >
            <option value="">
              Select Time
            </option>

            {ALL_SLOTS.map((slot) => {
              const booked = isBooked(slot);

              return (
                <option
                  key={slot}
                  value={slot}
                  disabled={booked}
                  style={{
                    color: booked ? "red" : "green",
                    fontWeight: 500,
                  }}
                >
                  {slot} - {booked ? "Booked" : "Available"}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* BOOKING MESSAGE */}
      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-[#4ebd45]/10 border border-[#4ebd45] rounded-2xl">

          <p className="text-black">
            The selected slot on{" "}
            <span className="font-semibold">
              {selectedDate}
            </span>{" "}
            at{" "}
            <span className="font-semibold">
              {selectedTime}
            </span>{" "}
            is available. Please fill in the booking form to reserve this slot.
          </p>
        </div>
      )}

    </div>
  );
}