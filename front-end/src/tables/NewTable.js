import React, { Fragment, useState } from "react";
import PageHeader from "../common/PageHeader";
import ErrorAlert from "../layout/ErrorAlert";
import NewTableForm from "./NewTableForm";

function NewTable() {
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
  });

  return (
    <Fragment>
      <PageHeader title={"New Table"} />
      <NewTableForm
        formData={formData}
        setFormData={setFormData}
        setFormError={setFormError}
      />
      <ErrorAlert error={formError} />
    </Fragment>
  );
}

export default NewTable;
