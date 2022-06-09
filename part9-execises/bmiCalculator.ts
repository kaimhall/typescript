type Result = string;

interface BmiValues {
  height: number;
  weight: number;
}

const parseArgs = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("input more arguments ");
  if (args.length < 4) throw new Error("input less arguments ");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[2]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("input number values ");
  }
};

export const calculateBmi = (height: number, weight: number): Result => {
  //BMI = body mass / body height squared
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight ";
  }
};

try {
  const { height, weight } = parseArgs(process.argv);
  if (height && weight) {
    console.log(calculateBmi(height, weight));
  }
} catch (error: unknown) {
  let errorMessage = "something went wrong - ";
  if (error instanceof Error) {
    errorMessage += "message:" + error.message;
  }
  console.log(errorMessage);
}
