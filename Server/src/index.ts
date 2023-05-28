import App from "./server";
import UserController from "./controllers/User/User.controller";
const PORT = process.env.PORT || 4001;

const app = new App(
  [
    new UserController(),
  ],

  Number(PORT)
);

app.startServer();
