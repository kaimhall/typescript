/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

type checkParamsOut = {
  height: number;
  weight: number;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkParams = (height: any, weight: any): checkParamsOut => {
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

const app = express();
app.use(express.json()); //remember json parsing

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises.length <= 0 || !target) {
    return res.send({ error: "parameters missing" }).status(400);
  }
  if (!target || isNaN(Number(target))) {
    return res.send({ error: "malformatted parameters" }).status(400);
  }
  daily_exercises.map((e: number) => {
    if (isNaN(Number(e))) {
      return res.send({ error: "malformatted parameters" }).status(400);
    } else return null;
  });

  const results = calculateExercises(daily_exercises, target);
  return res.send(results);
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = checkParams(req.query.height, req.query.weight);
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
