const knex = require("../db/connection");

function list(date) {
  return knex("reservations").select("*");
}

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

module.exports = {
  list,
  create,
};
