import React from "react";
import TableComponent from "./table";


function Table() {

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>  
      <TableComponent enableColumnFilters={checked} handleChange={handleChange}/>
    </>
  );
}

export default Table;