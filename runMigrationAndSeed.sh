#!/bin/sh

knex migrate:latest
knex seed:run
