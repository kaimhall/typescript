import patients from "../../data/patients";
import { NoSsn, Patient } from "../../types";

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNoSsn = (): NoSsn[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

export default {
  getEntries,
  getNoSsn,
};
