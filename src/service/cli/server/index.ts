import express from "express";
import apiRouter from "./routes/api";
import chalk from "chalk";
import {DEFAULT_PORT} from "../../../constants";

export default function runServer(args?) {
  const [customPort] = args;
  const port = parseInt(customPort, 10) || DEFAULT_PORT;
  const app = express();

  app.use(`/api`, apiRouter);

  app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
}
