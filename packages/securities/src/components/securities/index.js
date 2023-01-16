import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  GroupItem,
  Summary,
} from "devextreme-react/data-grid";
import moment from "moment";

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

  const [tableData, setTableData ] = useState([])

  useEffect(() => {
    if (data) {
      let d = data.map((item) => {
        item["effectiveDate"] = moment(item.effectiveDate).format("MM-DD-YYYY");
        return item;
      });
      setTableData(d);
    }
  }, [data]);

  const pageSizes = [10, 25, 50, 100];

  return loading ? (
    <LoaderComponent />
  ) : (
    <Paper sx={{ pt: 3 }}>
      <DataGrid
        dataSource={tableData}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        // onContentReady={this.onContentReady}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />
        <Column
          dataField="effectiveDate"
          caption="Date"
          dataType="date"
          groupIndex={0}
        />
        <Column
          dataField="symbol"
          caption="Symbol"
          dataType="number"
          format="percent"
          alignment="right"
          allowGrouping={false}
        />
        <Column dataField="name" dataType="string" caption="Name" />
        <Column
          dataField="price"
          dataType="string"
          caption="Price"
          format="currency"
          alignment="left"
        />
        <Column
          dataField="sector"
          dataType="string"
          caption="Sector"
          groupIndex={1}
        />
        <Summary>
          <GroupItem column="price" summaryType="sum" alignByColumn={true} />
        </Summary>
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </Paper>
  );
}
