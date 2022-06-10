export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type gender = "male" | "female" | "other";

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: gender;
  ssn?: string;
  dateOfBirth?: string;
}
export type NoSsn = Omit<Patient, "ssn">;
