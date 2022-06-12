export interface CP {
  name: string;
  exerciseCount: number;
}

export interface CPOne extends CP {
  name: "Fundamentals";
  description: string;
}

export interface CPTwo extends CP {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CPThree extends CP {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export type CPart = CPOne | CPTwo | CPThree;
