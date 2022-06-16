import { apiPatientUrl } from "../constants";
import axios from "axios";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { addCheckedPatient } from "../actions";
import entryDetails from "../components/entryDetails";
import { EntryFormValues } from "./AddEntryForm";
import { useState } from "react";
import { Button } from "@material-ui/core";
import AddEntryModal from "./addEntryModal";
//import { setCheckedPatients } from "../actions/index";

const PatientInfoPage = () => {
  const [{ checkedPatients, diagnosis }, dispatch] = useStateValue(); //calls usecontext
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  type idParam = { id: string };
  const { id } = useParams<idParam>() as idParam;

  const isChecked = (id: string): boolean => {
    return id === Object.keys(checkedPatients).find((k) => k === id);
  };

  const fetchPatient = async (id: string) => {
    try {
      //destructure promise.data into searchPatient variable
      const { data: searchPatient } = await axios.get<Patient>(
        `${apiPatientUrl}/${id}`
      );
      dispatch(addCheckedPatient(searchPatient));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  if (!isChecked(id)) {
    fetchPatient(id).catch((error) => {
      console.log(error);
    });
    return (
      <div>
        <strong>
          <h4>loading..</h4>
        </strong>
      </div>
    );
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      await axios.post<EntryFormValues>(
        `${apiPatientUrl}/${id}/entries`,
        values
      );

      closeModal();
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errorMessage = error.response.data.error;
      }
      setError(errorMessage);
    }
  };

  Object.values(
    checkedPatients[id].entries.map((e) => {
      const c = e.diagnosisCodes;
      if (c) {
        console.log(diagnosis[c[0]].name);
      }
    })
  );

  return (
    <div>
      <div>
        <h1>{Object.values(checkedPatients[id].name)} </h1>
        <p>ssn: {Object.values(checkedPatients[id].ssn)} </p>
        <p>occupation: {Object.values(checkedPatients[id].occupation)} </p>
        <p>gender: {Object.values(checkedPatients[id].gender)} </p>
      </div>
      <div>
        <h3>entries</h3>
        <div>
          {Object.values(
            checkedPatients[id].entries.map((entry) => (
              <div key={entry.id}>{entryDetails(entry)}</div>
            ))
          )}
        </div>
        <div>
          <ul>
            {Object.values(
              checkedPatients[id].entries.map((e) => {
                const c = e.diagnosisCodes;
                if (c) {
                  return c.map((code) => (
                    <li key={code}>
                      {code} {diagnosis[code].name}
                    </li>
                  ));
                }
              })
            )}
          </ul>
        </div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant='contained' onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    </div>
  );
};

export default PatientInfoPage;
