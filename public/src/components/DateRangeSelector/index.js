import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

export default function DateRangeSelector(props) {
  var d = new Date();
  const [startDate, setStartDate] = useState(
    new Date(d.setDate(d.getDate() - 9))
  ); // default is  10 days ago
  const [endDate, setEndDate] = useState(new Date()); //default is today
  const [intervalDays, setIntervalDays] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      let days = differenceInCalendarDays(endDate, startDate);
      console.log("Days: ", days);
      var start = format(startDate, "yyyy-MM-dd");
      var end = format(endDate, "yyyy-MM-dd");
      if (start == end) {
        days = 1;
      } else if (start != end && days == 0) {
        days = 2;
      } else {
        days = days + 1;
      }
      props.setInterval(days);
      setIntervalDays(days);
    }
  }, [startDate, endDate]);
  return (
    <>
      <div className="inline-block  mr-3 ">
        Start Date:
        <DatePicker
          className="text-center border-2 border-sky-500"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="inline-block  ">
        End Date:
        <DatePicker
          className="text-center border-2 border-sky-500"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <div className="ml-3 inline-block">
        Total Days:
        {intervalDays}
      </div>
    </>
  );
}
