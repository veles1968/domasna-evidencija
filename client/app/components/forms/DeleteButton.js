import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function DeleteButton({ title, onPress }) {
  const { handleDelete } = useFormikContext();

  return <Button title={title} onPress={onPress} />;
}

export default DeleteButton;
