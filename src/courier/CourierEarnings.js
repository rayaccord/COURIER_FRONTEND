import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CourierEarnings() {
  const navigate = useNavigate();

const [openIndex, setOpenIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);


  const locationState = useLocation();
const selectedMultiplier = locationState.state?.multiplier;


  // 📅 Days (like screenshot)
  const days = [
    { name: "Sat", date: 27 },
    { name: "Sun", date: 28 },
    { name: "Mon", date: 29 },
    { name: "Tue", date: 30 },
    { name: "Wed", date: 31 },
    { name: "Thu", date: 1 },
    { name: "Fri", date: 2 },
  ];

  // 💰 Earnings data
  const data = [
  {
    time: "00:00 - 10:00",
    multiplier: "1x",
    details: [
      { label: "1 km", price: "€2.00" },
      { label: "2 km", price: "€2.80" },
      { label: "3 km", price: "€3.50" },
      { label: "Wait time", price: "€0.02" },
    ],
  },
  {
    time: "10:00 - 13:00",
    multiplier: "2.4x",
    details: [
      { label: "1 km", price: "€3.80" },
      { label: "2 km", price: "€4.90" },
      { label: "3 km", price: "€6.00" },
      { label: "Wait time", price: "€0.05" },
    ],
  },
  {
    time: "13:01 - 20:00",
    multiplier: "2.3x",
    details: [
      { label: "1 km", price: "€3.60" },
      { label: "2 km", price: "€4.70" },
      { label: "3 km", price: "€5.80" },
      { label: "Wait time", price: "€0.05" },
    ],
  },
  {
    time: "20:01 - 23:00",
    multiplier: "3x",
    details: [
      { label: "1 km", price: "€4.80" },
      { label: "2 km", price: "€5.85" },
      { label: "3 km", price: "€6.90" },
      { label: "4 km", price: "€7.95" },
      { label: "5 km", price: "€9.00" },
      { label: "Wait time", price: "€0.06" },
    ],
  },
  {
    time: "23:00 - 23:59",
    multiplier: "1x",
    details: [
      { label: "1 km", price: "€2.20" },
      { label: "2 km", price: "€3.00" },
      { label: "3 km", price: "€3.80" },
      { label: "Wait time", price: "€0.03" },
    ],
  },
];

useEffect(() => {
  if (!selectedMultiplier) return;

  const index = data.findIndex(
    (item) => item.multiplier === selectedMultiplier
  );

  if (index !== -1) {
    setOpenIndex(index);
  }
}, [selectedMultiplier]);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HEADER */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)}>←</button>
          <h2 className="text-lg font-semibold">Telsiai-center</h2>
          <div></div>
        </div>

        {/* 📅 CALENDAR */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {days.map((day, index) => (
            <div
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`min-w-[60px] text-center p-2 rounded-xl cursor-pointer ${
                selectedDay === index
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              <div className="text-xs">{day.name}</div>
              <div className="font-semibold">{day.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 💰 EARNINGS LIST */}
      <div className="p-4 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="bg-gray-900 rounded-xl p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <span>{item.time}</span>
              <span>{item.multiplier}</span>
            </div>

            {/* Expanded */}
            {openIndex === index && item.details && (
              <div className="mt-3 text-sm text-gray-300">
                {item.details.map((d, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-gray-700 py-1"
                  >
                    <span>{d.label}</span>
                    <span>{d.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-400">
          Prices may change at any point of the day due to surge.
        </div>
      </div>
    </div>
  );
}