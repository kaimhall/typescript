export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

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
}
export type NoSsn = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
