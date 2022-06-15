import { apiPatientUrl } from "../constants";
import axios from "axios";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { addCheckedPatient } from "../actions";

const PatientInfoPage = () => {
  const [{ checkedPatients }, dispatch] = useStateValue(); //calls usecontext
  type idParam = { id: string };
  const { id } = useParams<idParam>() as idParam;

  const isChecked = (): boolean => {
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
  if (Object.values(checkedPatients).length === 0 && !isChecked()) {
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
  } else {
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
                <p key={entry.id}>
                  {entry.date} {entry.description}
                </p>
              ))
            )}
          </div>
          <div>
            <ul>
              {Object.values(
                checkedPatients[id].entries.map((e) => {
                  const c = e.diagnosisCodes;
                  if (c) {
                    return c.map((code) => <li key={code}>{code}</li>);
                  }
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default PatientInfoPage;
