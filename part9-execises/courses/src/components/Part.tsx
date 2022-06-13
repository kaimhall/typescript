import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Parts = (courses: CoursePart[]): JSX.Element[] => {
  const elem: JSX.Element[] = [];
  courses.forEach((part) => {
    switch (part.type) {
      case "normal":
        elem.push(
          <div key={part.name}>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <br></br>
            {part.description}
            <p></p>
          </div>
        );
        break;
      case "submission":
        elem.push(
          <div key={part.name}>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <br></br>
            {part.description}
            <p></p>
          </div>
        );
        break;
      case "groupProject":
        elem.push(
          <div key={part.name}>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <br></br>
            project exercises {part.groupProjectCount}
            <p></p>
          </div>
        );
        break;
      default:
        assertNever(part);
    }
  });
  return elem;
};

export default Parts;
