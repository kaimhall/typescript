import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const checkParams = (height: any, weight: any) => {
  if (!height || !weight) {
    throw new Error("malformatted parameters");
  } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error("malformatted parameters");
  } else {
    return {
      height: Number(height),
      weight: Number(weight),
    };
  }
};

app.get("/bmi", (_req: any, res: any) => {
  try {
    const { height, weight } = checkParams(
      _req.query.height,
      _req.query.weight
    );
    const bmiResult = calculateBmi(Number(height), Number(weight));
    res.send({
      weight: weight,
      height: height,
      bmi: bmiResult,
    });
  } catch (error: unknown) {
    res.status(400).send({
      error: "malformatted parameters",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
