import React from "react";
import { isEmpty } from "lodash";
import TableComponent from "./table";


function Table({ data, loading }) {

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return !isEmpty(data) && !loading ? (
    <div>  
      <TableComponent enableColumnFilters={checked} handleChange={handleChange} data={data}/>
    </div>
  ) : <h1>loading ....</h1>;
}

export default Table;