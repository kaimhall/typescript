import { Entry } from "../types";

const HospitalEntry = (entry: Entry): JSX.Element => (
  <div>
    <p>
      {entry.date} {entry.type}
    </p>
    <p>{entry.description}</p>
    <p>{entry.specialist}</p>
  </div>
);
const HCheckEntry = (entry: Entry): JSX.Element => {
  return (
    <div>
      <p>
        {entry.date} {entry.type}
      </p>
      <p>{entry}</p>
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
    </div>
  );
};
const OccupationalHealthEntry = (entry: Entry): JSX.Element => {
  return <div>{entry}</div>;
};

const exhaustiveCheck = (_param: never) => {
  throw new Error(`exhaustive check error`);
};

const entryDetails = (entry: Entry): JSX.Element | null => {
  switch (entry.type) {
    case "Hospital":
      return HospitalEntry(entry);
    case "HealthCheck":
      return HCheckEntry(entry);
    case "OccupationalHealthcare":
      return OccupationalHealthEntry(entry);
    default:
      exhaustiveCheck(entry);
      return null;
  }
};

export default entryDetails;
