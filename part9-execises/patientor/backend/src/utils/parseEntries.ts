import { Entry } from "../../types";

const entryData: Entry[] = [
  {
    id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
    date: "2015-01-02",
    type: "Hospital",
    specialist: "MD House",
    diagnosisCodes: ["S62.5"],
    description:
      "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    discharge: {
      date: "2015-01-16",
      criteria: "Thumb has healed.",
    },
  },
  {
    id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
    date: "2019-08-05",
    type: "OccupationalHealthcare",
    specialist: "MD House",
    employerName: "HyPD",
    diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
    description:
      "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ",
    sickLeave: {
      startDate: "2019-08-05",
      endDate: "2019-08-28",
    },
  },
  {
    id: "b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da",
    date: "2019-10-20",
    specialist: "MD House",
    type: "HealthCheck",
    description: "Yearly control visit. Cholesterol levels back to normal.",
    healthCheckRating: 0,
  },
  {
    id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
    date: "2019-09-10",
    specialist: "MD House",
    type: "OccupationalHealthcare",
    employerName: "FBI",
    description: "Prescriptions renewed.",
  },
  {
    id: "37be178f-a432-4ba4-aac2-f86810e36a15",
    date: "2018-10-05",
    specialist: "MD House",
    type: "HealthCheck",
    description:
      "Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.",
    healthCheckRating: 1,
  },
];

const exhaustiveCheck = (param: never): never => {
  throw new Error(`unchecked discriminated type error ${param}`);
};

const parseEntries = (entry: Entry) => {
  switch (entry.type) {
    case "Hospital":
      return entry;
    case "HealthCheck":
      return entry;
    case "OccupationalHealthcare":
      return entry;
    default:
      return exhaustiveCheck(entry);
  }
};

entryData.forEach((entry: Entry) => parseEntries(entry));

export default parseEntries;
