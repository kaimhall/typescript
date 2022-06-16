/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { TextField } from "../AddPatientModal/FormField";
import { Entry } from "../types";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [""],
        type: "HealthCheck",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='description'
              placeholder='description'
              name='description'
              component={TextField}
            />
            <Field
              label='date'
              placeholder='date'
              name='date'
              component={TextField}
            />
            <Field
              label='specialist'
              placeholder='specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='diagnosisCodes'
              placeholder='diagnosisCodes'
              name='diagnosisCodes'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Grid>
              <Grid item>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ float: "left" }}
                  type='button'
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type='submit'
                  variant='contained'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AddEntryForm;
