const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// #region ============= Primary =========================
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const methodName = "list";
  req.log.debug({ __filename, methodName });

  const reservations = await service.list();

  res.status(200).json(await reservations);
}

/**
 * Inserts a new reservation into reservation table
 * @returns {Object} New Reservation from table
 */
async function create(req, res) {
  const methodName = "create";
  req.log.debug({ __filename, methodName });

  const { reservation } = res.locals;

  const newReservation = await service.create(reservation);

  res.status(201).json(await newReservation);
}
// #endregion

// #region ============= Validation ======================
/**
 * Checks form data from client side
 * Verifies that all fields are filled
 */
function validateReservation(req, res, next) {
  const methodName = "validateReservation";
  req.log.debug({ __filename, methodName });

  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    },
  } = req.body;

  const errors = [];

  if (!first_name) errors.push("First Name");
  if (!last_name) errors.push("Last Name");
  if (!mobile_number) errors.push("Phone Number");
  if (!reservation_date) errors.push("Date");
  if (!reservation_time) errors.push("Time");
  if (!people) errors.push("Party Size");

  if (errors.length) {
    next({
      status: 400,
      message: `The following required fields are missing: ${errors.join(
        ", "
      )}`,
    });

    req.log.trace({ __filename, methodName, valid: false, missing: errors });
  }

  res.locals.reservation = req.body.data;
  next();
  req.log.trace({ __filename, methodName, valid: true });
}

/**
 * Checks that date given is
 * not on a Tuesday
 */
function isNotTuesday(req, res, next) {
  const methodName = "isNotTuesday";
  req.log.debug({ __filename, methodName });

  const { reservation_date } = res.locals.reservation;

  const day = new Date(reservation_date).getUTCDay();

  if (day === 2) {
    next({
      status: 400,
      message: `The restaurant is closed on Tuesdays. Please choose a different day.`,
    });

    req.log.trace({
      __filename,
      methodName,
      valid: false,
      reason: "Tuesday is not a valid day.",
    });
  }

  next();
  req.log.trace({ __filename, methodName, valid: true });
}

/**
 * Checks that date given is on
 * a later/future date from "today"
 */
function isFutureDate(req, res, next) {
  const methodName = "isFutureDate";
  req.log.debug({ __filename, methodName });

  const { reservation_date } = res.locals.reservation;
  const today = new Date();

  const formattedDate = formatDate(today);
  req.log.trace({ __filename, methodName: "formatDate", formattedDate });

  if (compare(reservation_date, formattedDate) !== 1) {
    next({
      status: 400,
      message: `The reservation must be on a future date.`,
    });

    req.log.trace({
      __filename,
      methodName,
      valid: false,
      reason: `${reservation_date} is not in the future. Today: ${formattedDate}`,
    });
  }

  next();
}

/**
 * Checks that reservation time
 * is between 10:30 and 21:30
 */
function isValidTime(req, res, next) {
  const methodName = "isValidTime";
  req.log.debug({ __filename, methodName });

  const lower = toMinutes("10:30"); // 10:30 AM
  const upper = toMinutes("21:30"); // 9:30 PM
  const { reservation_time } = res.locals.reservation;

  const formattedTIme = toMinutes(reservation_time);
  req.log.trace({ __filename, methodName: "toMinutes", formattedTIme });

  if (givenTime < lower || givenTime > upper) {
    next({
      status: 400,
      message: `The reservation time must be between 10:30 - 21:30. Your time: ${reservation_time}`,
    });

    req.log.trace({
      __filename,
      methodName,
      valid: false,
      reason: `${reservation_time} is not a valid time. Valid timeframe is between 10:30 - 21:30.`,
    });
  }

  next();
}
// #endregion

// #region ============= Helper Functions ================
function formatDate(date) {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
}

function compare(first, sec) {
  const firstDate = first.split("-");
  const secDate = sec.split("-");

  /**
   * Check by year first [0]
   * if needed, check by month [1]
   * finally, check by day [2]
   * if exact match, return 0
   */
  if (firstDate[0] > secDate[0]) return 1;
  else if (firstDate[0] < secDate[0]) return -1;
  else {
    if (firstDate[1] > secDate[1]) return 1;
    else if (firstDate[1] < secDate[1]) return -1;
    else {
      if (firstDate[2] > secDate[2]) return 1;
      else if (firstDate[2] < secDate[2]) return -1;
      else return 0;
    }
  }
}

function toMinutes(timeString) {
  const [hour, minutes] = timeString.split(":");

  return Number.parseInt(hour) * 60 + Number.parseInt(minutes);
}
// #endregion

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateReservation,
    isNotTuesday,
    isFutureDate,
    isValidTime,
    asyncErrorBoundary(create),
  ],
};
