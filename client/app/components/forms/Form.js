import React from "react";
import { Formik } from "formik";

function AppForm({
  initialValues,
  onChange, //-DT-20210203
  onDelete,
  onSubmit,
  validationSchema,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      // onChange={onChange} //-DT-20210203
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
