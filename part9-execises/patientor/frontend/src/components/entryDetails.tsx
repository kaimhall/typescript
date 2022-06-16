import { Entry } from "../types";

const HospitalEntry = (entry: Entry) => {
  return (
    <>
      <p>
        {entry.date} {entry.type}
        <br></br>
        {entry.description}
        <br></br>
        {entry.specialist}
      </p>
    </>
  );
};
const HCheckEntry = (entry: Entry) => {
  return (
    <>
      <p>
        {entry.date} {entry.type}
        <br></br>
        {entry.description}
        <br></br>
        {entry.specialist}
      </p>
    </>
  );
};

const OccupationalHealthEntry = (entry: Entry) => {
  return (
    <>
      <p>
        {entry.date} {entry.type}
        <br></br>
        {entry.description}
        <br></br>
        {entry.specialist}
      </p>
    </>
  );
};

const exhaustiveCheck = (param: never) => {
  throw new Error(`exhaustive check error: ${JSON.stringify(param)}`);
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
