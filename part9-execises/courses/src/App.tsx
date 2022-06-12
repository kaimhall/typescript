const App = () => {
  interface CP {
    name: string;
    exerciseCount: number;
  }

  const courseName = "Half Stack application development";

  const courseParts: CP[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const Total = ({ courses }: { courses: CP[] }): JSX.Element => (
    <div>
      Total exercises{" "}
      {courses.reduce((prev, curr) => prev + curr.exerciseCount, 0)}
    </div>
  );

  const Content = ({ courses }: { courses: CP[] }): JSX.Element => (
    <div>
      {courses.map((crs) => (
        <p key={crs.name}>
          {crs.name} {crs.exerciseCount}
        </p>
      ))}
    </div>
  );

  const Header = ({ head }: { head: string }): JSX.Element => <h1>{head}</h1>;

  return (
    <div>
      <Header head={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
