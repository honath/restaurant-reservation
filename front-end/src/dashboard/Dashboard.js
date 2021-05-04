import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import PageHeader from "../common/PageHeader";
import Reservations from "../reservations/Reservations";
import useQuery from "../utils/useQuery";
import NavigateDates from "./NavigateDates";
import Tables from "../tables/Tables";

import "../common/common.css"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const [reload, setReload] = useState(false);

  const query = useQuery().get("date");
  const today = date;
  if (query) date = query;

  useEffect(loadReservations, [date]);
  useEffect(loadTables, [date, reload]);

  function loadReservations() {
    setReservationsError(null);
    let source = axios.CancelToken.source();

    listReservations(source).then(setReservations).catch(setReservationsError);

    return () => source.cancel();
  }

  function loadTables() {
    setTablesError(null);
    let source = axios.CancelToken.source();

    listTables(source).then(setTables).catch(setTablesError);

    return () => source.cancel();
  }

  return (
    <Fragment>
      <PageHeader title={"Dashboard"} date={date} />
      <main className="row container-fluid flex-column flex-md-row m-0 justify-content-center">
        <section className="col m-0">
          <NavigateDates date={date} today={today}/>
          <Reservations reservations={reservations} date={date} />
          <ErrorAlert error={reservationsError} />
        </section>
        <section className="col-3 m-0">
          <Tables tables={tables} reload={reload} setReload={setReload}/>
          <ErrorAlert error={tablesError} />
        </section>
      </main>
    </Fragment>
  );
}

export default Dashboard;
