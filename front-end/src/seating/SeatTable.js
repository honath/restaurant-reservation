import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { listTables, readReservation } from "../utils/api";
import PageHeader from "../common/PageHeader";
import ErrorAlert from "../layout/ErrorAlert";
import SeatTableForm from "./SeatTableForm";
import ReservationCard from "./ReservationCard";

function SeatTable() {
  const { reservation_id } = useParams();
  const [tables, setTables] = useState();
  const [reservation, setReservation] = useState({});
  const [selection, setSelection] = useState();
  const [seatError, setSeatError] = useState(null);

  useEffect(loadTables, []);
  useEffect(getReservation, [reservation_id]);

  function loadTables() {
    setSeatError(null);
    let source = axios.CancelToken.source();

    listTables(source)
      .then((res) => setTables(res.data))
      .catch(setSeatError);

    return () => source.cancel();
  }

  function getReservation() {
    let source = axios.CancelToken.source();

    readReservation(reservation_id, source)
      .then((res) => setReservation(res.data))
      .catch(setSeatError);

    return () => source.cancel();
  }

  return (
    <Fragment>
      <PageHeader title={`Seat Reservation #${reservation_id}`} />
      <main>
        <ReservationCard reservation={reservation} />
        <SeatTableForm
          tables={tables}
          reservation={reservation}
          selection={selection}
          setSelection={setSelection}
          setSeatError={setSeatError}
        />
        <ErrorAlert error={seatError} />
      </main>
    </Fragment>
  );
}

export default SeatTable;
