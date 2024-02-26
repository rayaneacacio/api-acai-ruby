import config from "../../../knexfile";
import knex from "knex";

export const knexConnection = knex(config.development);