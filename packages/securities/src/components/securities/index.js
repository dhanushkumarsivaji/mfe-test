import React, { useState, useEffect } from "react";
import {
  Paper,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "600px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));


import CircularProgress from "@mui/material/CircularProgress";


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

export default function Securities({ data, loading }) {
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
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [input, setInput] = useState("");
  const [layOuts, setLayouts] = useState([]);
  let sessionStorageName = "security-layouts";

  useEffect(() => {
    let selected = JSON.parse(
      sessionStorage.getItem(sessionStorageName)
    )?.filter((item) => item.defaultLayout);
    if (selected && selected.length) {
      setUseLayout(selected[0].layout);
    } else {
      setUseLayout(columns);
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
      setUseLayout(selected[0].layout);
    } else {
      setUseLayout(columns);
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
      setSelectedColumns([]);
      setOpenCreatLayout(false);
      setInput("");
    }
  };

  return loading ? (
    <LoaderComponent />
  ) : (
    <Paper sx={{ pt: 3 }}>
      <Button onClick={() => setOpen(true)} style={{ textTransform: "none" }}>
        Layouts
      </Button>
      <Button
        style={{ textTransform: "none" }}
        onClick={() => setOpenCreatLayout(true)}
      >
        Create Layout
      </Button>
      <DataGrid
        dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        // onContentReady={this.onContentReady}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />
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
        onClose={() => setOpenCreatLayout(false)}
        aria-labelledby="customized-dialog-title"
        open={openCreatLayout}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => setOpenCreatLayout(false)}
        >
          Create Layout
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            name="layOutName"
            onChange={handleChange}
            label="Layout Name"
          />
          <FormGroup>
            {initialLayoutColumns.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    checked={selectedColumns.includes(item.id)}
                    onChange={(e) => handleChange(e, item.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label={item.caption}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button style={{ textTransform: "none" }} onClick={handleSubmit}>
            Create Layout
          </Button>
        </DialogActions>
      </BootstrapDialog>
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
