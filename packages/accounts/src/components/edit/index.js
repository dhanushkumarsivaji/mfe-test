import React,{ useState, useEffect } from "react";
import { isEmpty } from 'lodash';
import FormFields from "./formFields";

export default () => {
  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    if(sessionStorage.row) {
      setFormValues(JSON.parse(sessionStorage.row));
    }
  }, []);
  return (
    <>
      { !isEmpty(formValues) ? <FormFields formValues={formValues} /> : null}
    </>
  );
};
