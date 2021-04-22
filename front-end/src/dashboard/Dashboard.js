import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import PageHeader from "../common/PageHeader";
import Reservations from "../reservations/Reservations";
//import Tables from "../tables/Tables";
import useQuery from "../utils/useQuery";
import NavigateDates from "./NavigateDates";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const query = useQuery().get("date");
  const today = date;
  if (query) date = query;

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    setReservationsError(null);
    let source = axios.CancelToken.source();

    listReservations(source).then(setReservations).catch(setReservationsError);

    return () => source.cancel();
  }

  return (
    <Fragment>
      <PageHeader title={"Dashboard"} date={date} />
      <main className="row">
        <section className="col">
          <NavigateDates reservations={reservations} date={date} today={today}/>
          <Reservations reservations={reservations} date={date} />
          <ErrorAlert error={reservationsError} />
        </section>
        {/* <section className="col-3">
          <Tables />
        </section> */}
      </main>
    </Fragment>
  );
}

export default Dashboard;
