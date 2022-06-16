import { apiPatientUrl } from "../constants";
import axios from "axios";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { addCheckedPatient } from "../actions";

const PatientInfoPage = () => {
  const [{ checkedPatients, diagnosis }, dispatch] = useStateValue(); //calls usecontext
  type idParam = { id: string };
  const { id } = useParams<idParam>() as idParam;
  console.log(diagnosis);
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
  } else {
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
        </div>
      </div>
    );
  }
};

export default PatientInfoPage;
