import React, { Fragment, useState } from "react";
import PageHeader from "../common/PageHeader";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import NewResForm from "./NewResForm";

/**
 * Holds form state
 * to send as POST request
 * to API --
 * add column to Table "reservations"
 * @returns {JSX.Element}
 */
function NewReservation() {
  const [formError, setFormError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  return (
    <Fragment>
      <PageHeader title={"New Reservation"} />
      <NewResForm
        formData={formData}
        setFormData={setFormData}
        setFormError={setFormError}
        setDateError={setDateError}
        today={today()}
      />
      <ErrorAlert error={formError}/>
      <ErrorAlert error={dateError}/>
    </Fragment>
  );
}

export default NewReservation;
