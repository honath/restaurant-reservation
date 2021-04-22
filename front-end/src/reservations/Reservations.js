import React from "react";
import sortReservations from "./sortReservations";

/**
 * Takes in and formats reservations as a table
 * @param {Array} reservations
 * @param {String} date determined in parent (Dashboard.js)
 * @returns {JSX.Element}
 */
function Reservations({ reservations, date }) {
  /* Sort reservations by time */
  const sortedReservations = sortReservations(reservations);

  /* Format reservations as table rows */
  const mapReservations = [];
  sortedReservations.forEach((res, index) => {
    if (res.reservation_date === date)
      mapReservations.push(
        <tr key={res.reservation_id}>
          <td className="text-center">{`${res.first_name} ${res.last_name}`}</td>
          <td className="text-center">{res.mobile_number}</td>
          <td className="text-center">{res.reservation_date}</td>
          <td className="text-center">{res.reservation_time}</td>
        </tr>
      );
  });

  /* Render when ready */
  if (mapReservations.length) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Contact</th>
            <th className="text-center">Date</th>
            <th className="text-center">Time</th>
            {/* <th className="text-center">Actions</th> */}
          </tr>
        </thead>
        <tbody>{mapReservations}</tbody>
      </table>
    );
  }

  /* Default render */
  return <p className="text-center mt-5 fs-1">No reservations for {date}.</p>;
}

export default Reservations;
