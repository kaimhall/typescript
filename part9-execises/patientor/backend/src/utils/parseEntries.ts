/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */

const parseEntries = (entry: any) => {
  if (
    !entry.type.includes(
      "HealthCheck" || "OccupationalHealthcare" || "Hospital"
    )
  ) {
    throw new Error("invalid entry param 'type'");
  }
};
export default parseEntries;
