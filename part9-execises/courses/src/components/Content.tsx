import { CP } from "../types";

const Content = ({ courses }: { courses: CP[] }): JSX.Element => (
  <div>
    {courses.map((crs) => (
      <p key={crs.name}>
        {crs.name} {crs.exerciseCount}
      </p>
    ))}
  </div>
);

export default Content;
