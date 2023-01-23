import React, { useCallback, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/pdf_exporter";
import CircularProgress from "@mui/material/CircularProgress";
import { exportDataGrid as exportExcelGrid } from "devextreme/excel_exporter";
import Securities from "../../components/organisms/securities";

const LoaderComponent = () => {
  return (
    <div
      style={{
        // do your styles depending on your needs.
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <CircularProgress
        sx={{ width: "80px !important", height: "80px !important" }}
      />
    </div>
  );
};

export default function Index({ data, loading }) {
  const columns = [
    {
      id: 1,
      dataField: "effectiveDate",
      caption: "Date",
      dataType: "date",
      groupIndex: null,
      checked: false,
      format: "",
    },
    {
      id: 2,
      dataField: "symbol",
      caption: "Symbol",
      dataType: "number",
      groupIndex: null,
      checked: false,
      format: "",
    },
    {
      id: 3,
      dataField: "name",
      caption: "Name",
      dataType: "string",
      groupIndex: null,
      checked: false,
      format: "",
    },
    {
      id: 4,
      dataField: "price",
      caption: "Price",
      dataType: "string",
      groupIndex: null,
      checked: false,
      format: "",
    },
    {
      id: 5,
      dataField: "sector",
      caption: "Sector",
      dataType: "string",
      groupIndex: null,
      checked: false,
      format: "",
    },
  ];
  const [open, setOpen] = useState(false);
  const [openCreatLayout, setOpenCreatLayout] = useState(false);
  const [useLayout, setUseLayout] = useState(columns);
  const [initialLayoutColumns, setInitialLayoutColumns] = useState(columns);
  const [layout, setLayout] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [input, setInput] = useState("");
  const [layOuts, setLayouts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDummy, setDeleteDummy] = useState(null);
  const [editLayout, setEditLayout] = useState(null);
  const [gridData, setGridRef] = useState(null);
  let sessionStorageName = "security-layouts";

  useEffect(() => {
    let selected = JSON.parse(
      sessionStorage.getItem(sessionStorageName)
    )?.filter((item) => item.defaultLayout);
    if (selected && selected.length) {
      setLayout(selected[0].layout);
    }
  }, []);

  useEffect(() => {}, [sessionStorage.getItem(sessionStorageName)]);

  useEffect(() => {
    let layoutDataFromSession =
      sessionStorage.getItem(sessionStorageName) &&
      JSON.parse(sessionStorage.getItem(sessionStorageName));
    if (layoutDataFromSession) setLayouts(layoutDataFromSession);
  }, [sessionStorage.getItem(sessionStorageName)]);

  const pageSizes = [10, 25, 50, 100];
  const exportFormats = ["xlsx", "pdf"];
  const handleSelect = (item, index) => {
    let sessionLayout = JSON.parse(sessionStorage.getItem(sessionStorageName));
    for (let index = 0; index < sessionLayout.length; index++) {
      sessionLayout[index].isSelected = false;
    }
    sessionLayout[index].isSelected = true;
    sessionStorage.setItem(
      sessionStorageName,
      JSON.stringify([...sessionLayout])
    );
    setLayouts([...sessionLayout]);
  };

  const handleDefault = () => {
    let sessionLayout = JSON.parse(sessionStorage.getItem(sessionStorageName));
    for (let index = 0; index < sessionLayout.length; index++) {
      if (sessionLayout[index].isSelected) {
        sessionLayout[index].defaultLayout = true;
      } else {
        sessionLayout[index].defaultLayout = false;
      }
    }
    sessionStorage.setItem(
      sessionStorageName,
      JSON.stringify([...sessionLayout])
    );
    setOpen(false);
  };

  const handleSelectLayout = () => {
    let selected = JSON.parse(
      sessionStorage.getItem(sessionStorageName)
    )?.filter((item) => item.isSelected);
    if (selected && selected.length) {
      setLayout(selected[0].layout);
    }
    setOpen(false);
  };
  const handleChange = (e, id) => {
    if (id) {
      const {
        target: { checked },
      } = e;
      if (checked) setSelectedColumns([...selectedColumns, id]);
      else {
        let onlyChecked = selectedColumns.filter((item) => item !== id);
        setSelectedColumns(onlyChecked);
      }
    } else {
      const {
        target: { value },
      } = e;
      setInput(value);
    }
  };

  const handleSubmit = () => {
    let layoutOption = columns.filter((item) => {
      if (selectedColumns.includes(item.id)) return item;
    });
    let sessionLayout = JSON.parse(sessionStorage.getItem(sessionStorageName));
    if (input) {
      if (editLayout !== null) {
        let obj = {
          layout: layoutOption,
          layOutName: input,
          defaultLayout: false,
          isSelected: false,
        };
        sessionLayout.splice(editLayout, 1, obj);
        sessionStorage.setItem(
          sessionStorageName,
          JSON.stringify([...sessionLayout])
        );
      } else {
        let obj = {
          layout: layoutOption,
          layOutName: input,
          defaultLayout: false,
          isSelected: false,
        };
        if (sessionLayout) {
          sessionStorage.setItem(
            sessionStorageName,
            JSON.stringify([...sessionLayout, obj])
          );
        } else {
          sessionStorage.setItem(sessionStorageName, JSON.stringify([obj]));
        }
      }
      setSelectedColumns([]);
      setOpenCreatLayout(false);
      setEditLayout(null);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    setDeleteDummy(index);
    setOpenDialog(true);
  };

  const handleEdit = (item, index) => {
    setInput(item.layOutName);
    setOpenCreatLayout(true);
    setEditLayout(index);
  };

  const deleteLayout = () => {
    let sessionLayout = JSON.parse(sessionStorage.getItem(sessionStorageName));
    sessionLayout.splice(deleteDummy, 1);
    sessionStorage.setItem(
      sessionStorageName,
      JSON.stringify([...sessionLayout])
    );
    setDeleteDummy(null);
    setOpenDialog(false);
  };

  const handleClose = () => {
    setSelectedColumns([]);
    setOpenCreatLayout(false);
    setInput("");
  };

  const onExporting = React.useCallback((e) => {
    if (e.format === "xlsx") {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Main sheet");

      exportExcelGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      })
        .then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "DataGrid.xlsx"
            );
          });
        })
        .catch((e) => console.log(e));
      e.cancel = true;
    }
    if (e.format === "pdf") {
      const doc = new jsPDF();

      exportDataGrid({
        jsPDFDocument: doc,
        component: e.component,
        indent: 5,
      }).then(() => {
        doc.save("Companies.pdf");
      });
    }

    if (e.format === "csv") {
      // console.log(e);
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Main sheet");

      exportExcelGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      })
        .then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "DataGrid.csv"
            );
          });
        })
        .catch((e) => console.log(e));
      e.cancel = true;
    }
  });
  const handleClick = () => {
    let sessionLayout = JSON.parse(sessionStorage.getItem(sessionStorageName));

    if (input) {
      if (editLayout !== null) {
        let obj = {
          layout: sessionLayout[editLayout].layout,
          layOutName: input,
          defaultLayout: false,
          isSelected: false,
        };
        sessionLayout.splice(editLayout, 1, obj);
        sessionStorage.setItem(
          sessionStorageName,
          JSON.stringify([...sessionLayout])
        );
      } else {
        let obj = {
          layout: gridData?.instance.state(),
          layOutName: input,
          defaultLayout: false,
          isSelected: false,
        };
        if (sessionLayout) {
          sessionStorage.setItem(
            sessionStorageName,
            JSON.stringify([...sessionLayout, obj])
          );
        } else {
          sessionStorage.setItem(sessionStorageName, JSON.stringify([obj]));
        }
      }
      setOpenCreatLayout(false);
      setEditLayout(null);
      setInput("");
    }
  };

  const loadState = useCallback(() => {
    return layout;
  }, [layout]);

  return loading ? (
    <LoaderComponent />
  ) : (
    <Securities
      data={data}
      useLayout={useLayout}
      setUseLayout={setUseLayout}
      open={open}
      setOpen={setOpen}
      openCreatLayout={openCreatLayout}
      setOpenCreatLayout={setOpenCreatLayout}
      initialLayoutColumns={initialLayoutColumns}
      layOuts={layOuts}
      openDialog={openDialog}
      pageSizes={pageSizes}
      exportFormats={exportFormats}
      handleSelect={handleSelect}
      handleDefault={handleDefault}
      handleSelectLayout={handleSelectLayout}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      deleteLayout={deleteLayout}
      handleClose={handleClose}
      onExporting={onExporting}
      handleClick={handleClick}
      loadState={loadState}
      setGridRef={setGridRef}
      editLayout={editLayout}
      input={input}
      setOpenDialog={setOpenDialog}
    />
  );
}
