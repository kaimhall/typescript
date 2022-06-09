import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const height = _req.query.height;
  const weight = _req.query.weight;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmiResult = calculateBmi(Number(height), Number(weight));
    res.send({
      weight: weight,
      height: height,
      bmi: bmiResult,
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
