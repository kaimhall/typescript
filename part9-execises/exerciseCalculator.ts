type Rate = {
  rating: number;
  description: string;
};

interface trainResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const rate = (avg: number, target: number): Rate => {
  if (avg / target < 0.3) {
    return {
      rating: 1,
      description: "you can do better",
    };
  } else if (avg / target >= 0.35 && avg / target <= 0.8) {
    return {
      rating: 2,
      description: "almost there",
    };
  } else {
    return {
      rating: 3,
      description: "keep up the good work",
    };
  }
};
const parseInput = (args: Array<string>) => {
  const days = args.slice(2).map((element) => {
    if (!isNaN(Number(element))) {
      return Number(element);
    }
  });
  return days;
};

const calculateExercises = (days: Array<number>, target: number) => {
  const periodLength = days.length;
  const trainingDays = days.filter((n) => n !== 0).length;
  const average = days.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success = average >= target;
  const ratings = rate(average, target);
  return {
    periodLength,
    trainingDays,
    success,
    rating: ratings.rating,
    ratingDescription: ratings.description,
    target,
    average,
  };
};
try {
  const [target, ...days] = parseInput(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = "something went wrong - ";
  if (error instanceof Error) {
    errorMessage += "message:" + error.message;
  }
  console.log(errorMessage);
}
