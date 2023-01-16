import React from "react";
import { isEmpty } from "lodash";
import CircularProgress from "@mui/material/CircularProgress";
import TableComponent from "./table";

const LoaderComponent = () => {
  return (
    <div
      style={{
        // do your styles depending on your needs.
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: '60vh'
      }}
    >
      <CircularProgress sx={{width:'80px !important', height:'80px !important'}}/>
    </div>
  );
};

function Table({ data, loading }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return !isEmpty(data) && !loading ? (
    <div>
      <TableComponent
        enableColumnFilters={checked}
        handleChange={handleChange}
        data={data}
      />
    </div>
  ) : (
    <LoaderComponent />
  );
}

export default Table;
