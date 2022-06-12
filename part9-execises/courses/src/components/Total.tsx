import { CP } from "../types";

const Total = ({ courses }: { courses: CP[] }): JSX.Element => (
  <div>
    Total exercises{" "}
    {courses.reduce((prev, curr) => prev + curr.exerciseCount, 0)}
  </div>
);
export default Total;
