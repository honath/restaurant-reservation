import React from "react";
import { Link } from "react-router-dom";

function ReservationRows({ sortedReservations }) {
  /* Format reservations as table rows */
  const mapReservations = [];
  sortedReservations.forEach((res, index) => {
    const { reservation_id, status } = res;
    const capitalStatus = status.charAt(0).toUpperCase() + status.slice(1);

    
      mapReservations.push(
        <tr key={res.reservation_id} className="res-text table-row">
          <td className="text-center">{`${res.first_name} ${res.last_name}`}</td>
          <td className="text-center">{res.mobile_number}</td>
          <td className="text-center">{res.reservation_date}</td>
          <td className="text-center">{res.reservation_time}</td>
          <td
            className="text-center"
            data-reservation-id-status={res.reservation_id}
          >
            {capitalStatus}
          </td>
          {status === "booked" ? (
            <td className="text-center">
              <Link
                className="btn btn-secondary"
                to={`/reservations/${reservation_id}/seat`}
              >
                Seat
              </Link>
            </td>
          ) : null}
        </tr>
      );
    
  });

  /* Render when ready */
  if (mapReservations.length)
    return <tbody className="res-text">{mapReservations}</tbody>;

  /* Default render */
  return (
    <tbody>
      <tr>
        <td className="text-center mt-5 fs-1">No reservations found.</td>
      </tr>
    </tbody>
  );
}

export default ReservationRows;
