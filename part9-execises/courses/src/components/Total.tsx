import { CoursePart } from "../types";

const Total = ({ courses }: { courses: CoursePart[] }): JSX.Element => (
  <div>
    Total exercises{" "}
    {courses.reduce((prev, curr) => prev + curr.exerciseCount, 0)}
  </div>
);
export default Total;
