import React from "react";
import { useHistory } from "react-router";

import "../common/common.css";
import { createReservation } from "../utils/api";
import isValidDate from "./isValidDate";
import isValidTime from "./isValidTime";

/**
 * Renders form
 * Modifies formdata state
 * Handles form submission
 * or cancel
 * ---
 * Submission adds
 * column to Table "reservations"
 * @param {Object} formData state
 * @param {Function} setFormData state manipulator
 * @param {String} today today's date
 * @returns {JSX.Element}
 */
function NewResForm({
  formData,
  setFormData,
  setFormError,
  setDateError,
  today,
}) {
  const history = useHistory();

  function handleChange({ target }) {
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const date = formData.reservation_date;
    const time = formData.reservation_time;

    if (!(await isValidDate(date, today)))
      setDateError({
        message: "Reservation must be on a future date and not a Tuesday.",
      });
    else if (!(await isValidTime(time)))
      setDateError({
        message: `${time} is not a valid reservation time. Reservation must be between 10:30 AM and 9:30 PM`,
      });
    else
      await createReservation(formData)
        .then((res) => history.push(`/dashboard?date=${date}`))
        .catch(setFormError);
  }

  function handleCancel(event) {
    event.preventDefault();

    history.goBack();
  }

  return (
    <main className="mt-4">
      <form>
        <div className="d-flex mb-4">
          <div className="col-4">
            <label htmlFor="first_name" className="form-label mb-0">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-4">
            <label htmlFor="last_name" className="form-label mb-0">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className="col-3 mb-4">
          <label htmlFor="mobile_number" className="form-label mb-0">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="d-flex mb-4">
          <div className="col-3">
            <label htmlFor="reservation_date" className="form-label mb-0">
              Date of Reservation
            </label>
            <input
              type="date"
              className="form-control"
              name="reservation_date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              min={today}
              value={formData.reservation_date}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-3">
            <label htmlFor="reservation_time" className="form-label mb-0">
              Time of Reservation
            </label>
            <input
              type="time"
              className="form-control"
              name="reservation_time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              value={formData.reservation_time}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="col-2">
            <label htmlFor="people" className="form-label mb-0">
              Party Size
            </label>
            <input
              type="number"
              className="form-control w-50"
              name="people"
              value={formData.people}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className="d-flex">
          <button
            type="submit"
            className="btn btn-primary col-1 mx-3 p-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary col-1 p-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default NewResForm;
