import React from "react";
import { useState } from "react";

function DateNav() {
  const [selectedDay, setSelectedDay] = useState("Today");

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };
  return (
    <div className="flex font-semibold justify-center sm:justify-start sm:text-[1rem] text-sm sm:leading-[1.17rem] gap-8 ">
      <p
        onClick={() => handleDayClick("Today")}
        className={`cursor-pointer pb-1  relative ${
          selectedDay === "Today" ? "text-black dark:text-red-500" : ""
        }`}
      >
        Today
        {selectedDay === "Today" && (
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/3 w-[80%] h-[2px] bg-black dark:bg-red-700 transition-all duration-300 ease-in-out" />
        )}
      </p>
      <p
        onClick={() => handleDayClick("This Week")}
        className={`cursor-pointer pb-1 relative ${
          selectedDay === "This Week" ? "text-black dark:text-red-500" : ""
        }`}
      >
        This Week
        {selectedDay === "This Week" && (
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/3 w-[80%] h-[2px] bg-black dark:bg-red-700 transition-all duration-300 ease-in-out" />
        )}
      </p>
      <p
        onClick={() => handleDayClick("This Month")}
        className={`cursor-pointer pb-1 relative ${
          selectedDay === "This Month" ? "text-black dark:text-red-500" : ""
        }`}
      >
        This Month
        {selectedDay === "This Month" && (
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/3 w-[80%] h-[2px] bg-black dark:bg-red-700 transition-all duration-500 ease-in-out" />
        )}
      </p>
    </div>
  );
}

export default DateNav;
