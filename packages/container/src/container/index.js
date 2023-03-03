import React, { useCallback, useRef } from "react";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { styled } from "@mui/material/styles";
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import PopOver from "../components/PopOver";
import DevExtremeGrid from "../components/devextremeGrid";

import { customers } from "./data";

const ExportLayoutsContainer = styled("div")(() => ({
  backgroundColor: '#DAE3F2' ,
  padding: '22px 12px',
  display: 'flex',
  justifyContent: 'end'
}));

export default function HoldingsByAccount() {
  const grid = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [includeAllColumnsInExport, setIncludeAllColumnsInExport] =
    React.useState(false);

  const handleExportPopOverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleExportPopOverClose = () => {
    setIncludeAllColumnsInExport(false);
    setAnchorEl(null);
  };

  const exportFormatsData = [
    {
      id: "xlsx",
      name: "Microsoft Excel",
    },
    {
      id: "pdf",
      name: "PDF",
    },
    {
      id: "csv",
      name: "CSV",
    },
  ];

  const handleGridExport = useCallback(async (fileFormat, fileName) => {
    if (fileFormat && fileName) {
      if (fileFormat === "xlsx") {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("HoldingsByAccountXLSX");

        await exportDataGrid({
          component: grid.current.instance,
          worksheet: worksheet,
        }).then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              `${fileName}.xlsx`
            );
          });
        });
      } else if (fileFormat === "pdf") {
        const doc = new jsPDF();
        await exportDataGridToPdf({
          jsPDFDocument: doc,
          component: grid.current.instance,
        }).then(() => {
          doc.save(`${fileName}.pdf`);
        });
      } else {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("HoldingsByAccountCSV");
        await exportDataGrid({
          component: grid.current.instance,
          worksheet: worksheet,
        }).then(function () {
          workbook.csv.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              `${fileName}.csv`
            );
          });
        });
      }
    }

    handleExportPopOverClose();
  }, []);


const onSubmit = (data) => {
  handleGridExport(data.exportfileformat,data.exportfilename)
}

  return (
    <div>
    <ExportLayoutsContainer>
    <PopOver
    handleExportPopOverOpen={handleExportPopOverOpen}
    anchorEl={anchorEl}
    handleExportPopOverClose={handleExportPopOverClose}
    includeAllColumnsInExport={includeAllColumnsInExport}
    setIncludeAllColumnsInExport={setIncludeAllColumnsInExport}
    exportFormatsData={exportFormatsData}
    onSubmit={onSubmit}
  />
    </ExportLayoutsContainer>



      <DevExtremeGrid
        data={customers}
        gridRef={grid}
        includeAllColumnsInExport={includeAllColumnsInExport}
      />
    </div>
  );
}
