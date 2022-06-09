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
  if (process.argv[2] || process.argv[3]) {
    const { height, weight } = parseArgs(process.argv);

    console.log(calculateBmi(height, weight));
  }
} catch (error: unknown) {
  let errorMessage = "error occurred";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
    console.log(errorMessage);
  }
}
