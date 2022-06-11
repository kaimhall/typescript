import { NewPatient, Gender } from "../../types";

const isString = (txt: unknown): txt is string => {
  return typeof txt === "string" || txt instanceof String;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("incorrect or missing nasic info: " + str);
  }
  return str;
};

const parseSsn = (ssn: unknown): string | undefined => {
  if (!ssn) {
    return "";
  } else if (!isString(ssn)) {
    throw new Error("incorrect ssn: " + ssn);
  } else {
    return ssn;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (par: any): par is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(par);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("incorrect or missing gender: " + gender);
  }
  return gender;
};

type Fields = {
  name: unknown;
  occupation: unknown;
  gender: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
};

const parsePatientEntry = ({
  name,
  occupation,
  gender,
  dateOfBirth,
  ssn,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    occupation: parseString(occupation),
    gender: parseGender(gender),
    dateOfBirth: parseString(dateOfBirth),
    ssn: parseSsn(ssn),
  };

  return newEntry;
};

export default parsePatientEntry;
