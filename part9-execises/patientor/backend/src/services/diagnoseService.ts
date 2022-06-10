import diagnoses from "../../data/diagnoses";
import { Diagnose } from "../../types";

const getEntries = (): Array<Diagnose> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};
export default {
  getEntries,
};
