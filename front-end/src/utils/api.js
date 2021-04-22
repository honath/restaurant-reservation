import axios from "axios";
import { formatAsDate, formatAsTime } from "./date-time";

/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Takes in a axios cancel token
 * @param source
 * @returns {Promise<[reservation]>}
 */
export async function listReservations(source) {
  const url = `${API_BASE_URL}/reservations`;

  const config = {
    headers,
    cancelToken: source.token,
  };

  return axios
    .get(url, { config })
    .then(({ data }) => {
      /**
       * Converts date and time into
       * proper format for use by client
       * if there is any data to parse
       */
      if (data.length) {
        data.forEach(({ reservation_date, reservation_time }, index) => {
          data[index].reservation_date = formatAsDate(reservation_date);
          data[index].reservation_time = formatAsTime(reservation_time);
        });
      }

      return data;
    })
    .catch((err) => Promise.reject({ message: err.message }));
}

/**
 * Takes in form data as
 * new reservation object
 * @param {Object} reservation
 * @returns {Promise}
 */
export async function createReservation(reservation) {
  const url = `${API_BASE_URL}/reservations`;

  const config = { headers };

  try {
    const res = await axios.post(url, { data: reservation }, { config });
    return Promise.resolve({
      status: res.status,
      data: res.data,
    });
  } catch ({ response }) {
    return Promise.reject({
      status: response.status,
      message: response.data.message,
    });
  }
}
