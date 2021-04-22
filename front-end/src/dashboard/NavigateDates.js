import React from "react";
import { useHistory } from "react-router";
import sortDates from "./sortDates";

import "../common/common.css";

function NavigateDates({ reservations, date, today }) {
  const history = useHistory();

  /* List of unqiue reservation dates */
  const dates = new Set();

  /* Add today and given date*/
  dates.add(today);
  dates.add(date);

  /**
   * Add dates to set for unique dates,
   * then sort by date
   */
  reservations.forEach((res) => dates.add(res.reservation_date));
  const sortedDates = sortDates([...dates]);

  let currentIndex = sortedDates.indexOf(date);

  function handleToday() {
    history.push(`/dashboard?date=${today}`);
  }

  function handleNext() {
    if (currentIndex === sortedDates.length - 1) currentIndex = 0;
    else currentIndex++;

    history.push(`/dashboard?date=${sortedDates[currentIndex]}`);
  }

  function handlePrev() {
    if (currentIndex === 0) currentIndex = sortedDates.length - 1;
    else currentIndex--;

    history.push(`/dashboard?date=${sortedDates[currentIndex]}`);
  }

  return (
    <div className="d-flex justify-content-around my-3">
      <button className="btn btn-primary" onClick={handlePrev}>
        <span className="oi oi-arrow-circle-left mr-2" />
        Previous Date
      </button>
      <button className="btn btn-primary px-4" onClick={handleToday}>
        Today
      </button>
      <button className="btn btn-primary" onClick={handleNext}>
        Next Date
        <span className="oi oi-arrow-circle-right ml-2" />
      </button>
    </div>
  );
}

export default NavigateDates;
