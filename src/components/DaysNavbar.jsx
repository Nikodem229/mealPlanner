import React from "react";
import dayjs from "dayjs"; // Do obsługi dat

const DaysNavbar = ({ selectedDate, setSelectedDate }) => {
  // Generowanie dat - dla komputerów 14 dni, dla smartfonów 5 dni
  const days = Array.from({ length: 14 }, (_, i) =>
    dayjs(selectedDate).subtract(7 - i, "day")
  );

  return (
    <>
      <div className="bg-slate-900 pt-4 relative">
        <h3 className="text-center text-white">{days[7].format("MMMM")}</h3>
        <button
          className="absolute bottom-0 right-5 px-3 py-1 rounded-lg bg-blue-600 text-white text-sm"
          onClick={() => setSelectedDate(dayjs())}
        >
          Dziś
        </button>
      </div>
      <div className="flex justify-center items-center gap-2 bg-slate-900 px-3 pb-5 pt-3">
        <button
          className="px-3 py-2 rounded-lg bg-slate-700 text-white"
          onClick={() => setSelectedDate(dayjs(selectedDate).subtract(1, "day"))}
        >
          ◀
        </button>

        {/* Dni */}
        {days.map((date, index) => (
          <button
            key={index}
            className={`px-3 py-2 rounded-lg text-white ${
              date.isSame(dayjs(), "day") ? "bg-blue-500" : "bg-slate-700"
            } ${date.isSame(selectedDate, "day") ? "ring-2 ring-blue-400" : ""} 
            ${index < 5 ? "sm:block" : "hidden sm:block"} sm:w-[calc(100%/14)]`} // Wyświetlanie odpowiedniej liczby dni
            onClick={() => setSelectedDate(date)}
          >
            {date.format("DD")}
          </button>
        ))}

        <button
          className="px-3 py-2 rounded-lg bg-slate-700 text-white"
          onClick={() => setSelectedDate(dayjs(selectedDate).add(1, "day"))}
        >
          ▶
        </button>
      </div>
    </>
  );
};

export default DaysNavbar;
