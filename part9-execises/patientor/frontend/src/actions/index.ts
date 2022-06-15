import { Patient } from "../types";
import { Action } from "../state";

export const setPatientList = (patientList: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patientList,
});

export const AddPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient,
});

export const addCheckedPatient = (patient: Patient): Action => ({
  type: "ADD_CHECKED_PATIENT",
  payload: patient,
});
