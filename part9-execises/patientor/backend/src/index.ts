import express from "express";
import patientRouter from "./routes/patients";
import DiagnoseRouter from "./routes/diagnoses";
import cors = require("cors");

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("route up!");
  res.send("pong");
});

app.use("/api/diagnoses", DiagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
