import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "i2340609",
  host: "localhost",
  port: "5432",
  database: "teenJobChat",
});
