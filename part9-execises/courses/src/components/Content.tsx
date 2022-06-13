import { CoursePart } from "../types";
import Parts from "./Part";

const Content = ({ courses }: { courses: CoursePart[] }): JSX.Element => {
  const elemList = Parts(courses);
  return <div>{elemList.map((e) => e)}</div>;
};
export default Content;
