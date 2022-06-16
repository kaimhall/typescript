/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientRecord from "../../data/patients";
import { NoSsn, Patient, NewPatient, Entry, EntryWithoutId } from "../../types";
import { v1 as uuid } from "uuid";
import parseEntries from "../utils/parseEntries";

export type noIdEntry = Omit<Entry, "id">;

const getEntries = (): Array<Patient> => {
  return patientRecord;
};

const getPatient = (id: string): Patient | undefined => {
  const searchPatient = patientRecord.find((p) => p.id === id);
  return searchPatient;
};

const getNoSsn = (): NoSsn[] => {
  return patientRecord.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const addPatient = (entry: NewPatient): NoSsn => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newEntry = {
    id: id,
    ...entry,
  };
  patientRecord.push(newEntry);
  return newEntry;
};

const addEntry = (id: string, entry: EntryWithoutId) => {
  const entryId: string = uuid();
  const entryToAdd: Entry = {
    id: entryId,
    ...entry,
  };

  const checkedEntry = parseEntries(entryToAdd);
  const patientForEntry = patientRecord.find((p) => p.id === id);

  if (typeof patientForEntry !== "undefined") {
    patientForEntry.entries = patientForEntry.entries.concat(checkedEntry);
  }
  return checkedEntry;
};

export default {
  getEntries,
  getNoSsn,
  addPatient,
  getPatient,
  addEntry,
};
