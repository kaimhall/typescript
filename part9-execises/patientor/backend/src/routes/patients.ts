/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from "express";
import patientService from "../services/patientService";
import parsePatientEntry from "../utils/parsePatientEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNoSsn());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parsePatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "error: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
