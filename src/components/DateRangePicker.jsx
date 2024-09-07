import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div>
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          dateFormat="yyyy/MM/dd"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          dateFormat="yyyy/MM/dd"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
