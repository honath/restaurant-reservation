const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

// ====================== Validation ======================
/**
 *
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

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateReservation, asyncErrorBoundary(create)],
};
