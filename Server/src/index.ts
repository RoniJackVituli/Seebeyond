import App from "./server";
import UserController from "./controllers/User/User.controller";
import BlindController from "./controllers/Blind/Blind.contorller";
import VolunteerController from "./controllers/Volunteer/Volunteer.controller";
const PORT = process.env.PORT || 4001;

const app = new App(
  [
    new UserController(),
    new BlindController(),
    new VolunteerController(),
  ],

  Number(PORT)
);

app.startServer();
