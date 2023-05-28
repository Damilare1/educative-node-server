/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries in the users table
  return knex("survey_admins")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("survey_admins").insert([
        {
          id: 1,
          email: "user1@example.com",
          username: "user1",
          password: "password1",
        },
        {
          id: 2,
          email: "user2@example.com",
          username: "user2",
          password: "password2",
        },
        {
          id: 3,
          email: "user3@example.com",
          username: "user3",
          password: "password3",
        },
      ]);
    });
};
