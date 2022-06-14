export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export type Entry = {
  description: string;
  date: string;
  specialist: string;
  diagnosis: string;
};

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
export type NoSsn = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;
export type PublicPatient = Omit<Patient, "ssn" | "entries">;
