import express, { Application } from "express";
import Controller from "../utils/interfaces";
import mongoose, { connect, ConnectOptions } from "mongoose";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

dotenv.config();


class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
  }

  private initialiseMiddleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api/", controller.router);
    });
  }

  private async initialiseDatabaseConnection(): Promise<void> {
    mongoose.set("strictQuery", true);
    await connect(`${process.env.MONGO_PATH}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
      .then(() => {
        console.log("Connected to database!");
      })
      .catch(() => {
        console.log("Some problem to connect to db!");
      });
  }

  public startServer(): void {
    this.express.listen(this.port, () => {
      console.log(`The start on port ${this.port}`);
    });
  }
}

export default App;
