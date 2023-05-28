import App from "./server";
const PORT = process.env.PORT || 4001;

const app = new App(
  [],

  Number(PORT)
);

app.startServer();
