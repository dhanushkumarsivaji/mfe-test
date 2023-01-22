import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Paper,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  Divider,
  DialogContentText,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import CircularProgress from "@mui/material/CircularProgress";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Export,
  StateStoring,
  Sorting,
  ColumnChooser,
  FilterRow,
  HeaderFilter,
} from "devextreme-react/data-grid";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { exportDataGrid } from "devextreme/pdf_exporter";
import { exportDataGrid as exportExcelGrid } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "600px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));


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


export default function Securities({data, loading}) {
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
  let sessionStorageName = "security-layouts";
  const [store, setStore] = useState([]);
  const gridref = useRef(null);



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
  let gridData;
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

  return loading ? ( <LoaderComponent /> ) : (
    <Paper sx={{ pt: 3 }}>
      <Button onClick={() => setOpen(true)} style={{ textTransform: "none" }}>
        Layouts
      </Button>
      <Button
        style={{ textTransform: "none" }}
        onClick={() => setOpenCreatLayout(true)}
      >
        Save Layout
      </Button>
      <DataGrid
        dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        onExporting={onExporting}
        ref={(ref) => (gridData = ref)}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />
        <StateStoring enabled={true} customLoad={loadState} type="custom" />
        <Sorting mode="multiple" />
        <Export enabled={true} formats={exportFormats} />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <ColumnChooser enabled={true} mode="select" />
        {useLayout.map(({ dataField, caption, dataType, groupIndex }) => (
          <Column
            dataField={dataField}
            caption={caption}
            dataType={dataType}
            groupIndex={groupIndex}
            key={caption}
          />
        ))}

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          LayOuts
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography>Available layouts</Typography>
          {layOuts.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 0px",
                }}
              >
                <Button
                  key={item.layOutName}
                  style={{
                    textTransform: "none",
                    backgroundColor: item.isSelected ? "green" : "",
                    color: item.isSelected ? "white" : "ActiveBorder",
                  }}
                  onClick={() => handleSelect(item, index)}
                >
                  {item.layOutName}
                </Button>
                <div>
                  <Button onClick={() => handleEdit(item, index)}>Edit</Button>
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                </div>
              </div>
              <Divider />
            </div>
          ))}
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ textTransform: "none" }}
            onClick={handleSelectLayout}
          >
            Select Layout
          </Button>
          <Button style={{ textTransform: "none" }} onClick={handleDefault}>
            Set Default
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openCreatLayout}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {editLayout !== null ? "Edit Layout" : "Create Layout"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            name="layOutName"
            onChange={handleChange}
            value={input}
            width={100}
            label="Layout Name"
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ textTransform: "none" }} onClick={handleClick}>
            {editLayout !== null ? "Update Layout" : "Create Layout"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteLayout}>Confirm</Button>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
// <Summary>
//           <GroupItem column="price" summaryType="sum" alignByColumn={true} />
//         </Summary>

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
