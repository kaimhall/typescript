export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartDescription {
  description: string;
}

export interface CoursePartNormal
  extends CoursePartBase,
    CoursePartDescription {
  type: "normal";
}

export interface CourseSubmissionPart
  extends CoursePartBase,
    CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}
export interface CoursePartRequirements
  extends CoursePartBase,
    CoursePartDescription {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart =
  | CoursePartRequirements
  | CoursePartNormal
  | CourseProjectPart
  | CourseSubmissionPart;
