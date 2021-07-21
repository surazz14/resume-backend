require("dotenv").config();
import "reflect-metadata";
import startServer from "./server";
import { createConnection } from "typeorm";

const start = async() => {
  const db = await createConnection();
  startServer(db);
};
start();