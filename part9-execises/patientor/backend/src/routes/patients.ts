/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from "express";
import patientService from "../services/patientService";
import parsePatientEntry from "../utils/parsePatientEntry";
import { Entry } from "../../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNoSsn());
});

router.get("/:id", (req, res) => {
  const id: string = req.params.id;
  const searchedPatient = patientService.getPatient(id);
  if (searchedPatient) {
    res.send(searchedPatient);
  } else {
    res.sendStatus(404);
  }
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

router.post("/:id/entries", (req, res) => {
  const id: string = req.params.id;
  const entry: Entry = req.body;
  try {
    const addedEntry = patientService.addEntry(id, entry);
    res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "error: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
