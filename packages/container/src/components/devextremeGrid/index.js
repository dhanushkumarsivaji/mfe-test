import React from "react";
import DataGrid, {
  Column,
  GroupPanel,
  Paging,
  SearchPanel,
  ColumnChooser,
} from "devextreme-react/data-grid";
import { styled } from "@mui/material/styles";

const DataGridContainer = styled("div")`
  /* .table-expanded-depth-0 + .table-expanded-depth-1 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  } */
  .dx-toolbar {
    background-color: #dae3f2;
  }

  .dx-group-panel-message {
    color: #000000;
  }
  .dx-datagrid-header-panel .dx-toolbar {
    margin-bottom: 8px;
  }

  .dx-datagrid-header-panel {
    /* padding-bottom: 20px; */
    background-color: #dae3f2;
    padding: 20px 10px;
  }
  .dx-group-panel-item {
    padding: 10px 16px;
    gap: 16px;
    background: #ffffff;
    border: 1px solid #aebdd3;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #222226;
  }

  .dx-datagrid .dx-sort-down::before,
  .dx-datagrid .dx-sort-up::before {
    color: #3a547c;
    font-size: 16px;
  }

  .dx-datagrid-group-opened,
  .dx-datagrid-group-closed {
    font-size: 24px;
    background-position: 0 0;
    padding: 10px 8px;
    background-size: 18px 18px;
    text-align: center;
    color: #3a547c;
  }

  .dx-header-row {
    color: #606f89;
    background: #dae3f2;
  }

  .dx-header-row td {
    padding: 14px 8px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .dx-datagrid .dx-row > td {
    font-style: normal;
    font-size: 16px;
    padding: 14px 8px;
    text-transform: capitalize;
    color: #606f89;
  }

  .dx-datagrid .dx-group-row > td {
    color: #000000;
  }
  .dx-datagrid-rowsview .dx-row.dx-group-row:not(.dx-row-focused) {
    background: #ffffff;
  }

  .dx-datagrid-rowsview .dx-row-focused.dx-data-row > td:not(.dx-focused) {
    background-color: rgba(218, 227, 242, 0.5);
    color: #606f89;
  }

  .dx-datagrid-rowsview .dx-row-focused.dx-data-row > td {
    border-bottom: none;
    border-top: none;
  }
`;

export default function DevExtremeGrid({
  data,
  gridRef,
  includeAllColumnsInExport,
}) {
  

  function optionChanged(e) {
    if(e.fullName.includes('groupIndex')) {

          setTimeout(function(){
            var groupedColumns = e.component.getVisibleColumns().filter(x => x.groupIndex !== undefined);

            if(groupedColumns.length >= 2){
                var columns = e.component.getVisibleColumns().filter(x => x.groupIndex === undefined)
                columns.forEach(function(element){
                    e.component.columnOption(element.dataField, 'allowGrouping', false)
                })
            } else {
                var columns = e.component.getVisibleColumns().filter(x => x.groupIndex === undefined)
                columns.forEach(function(element) {
                    e.component.columnOption(element.dataField, 'allowGrouping', true)
                })
            }   
          })
    }
  }
  return (
    <DataGridContainer>
      <DataGrid
        dataSource={data}
        keyExpr="ID"
        allowColumnReordering={true}
        ref={gridRef}
        showColumnLines={false}
        showRowLines={false}
        showBorders={true}
        rowAlternationEnabled={false}
        focusedRowEnabled={true}
          focusedRowKey={4}
        onOptionChanged={optionChanged}
      >
        <ColumnChooser enabled={true} />
        <GroupPanel visible={true} />
        <SearchPanel visible={true} />
        <Paging defaultPageSize={10} />
        <Column dataField="CompanyName" groupIndex={0} dataType="string" />
        <Column dataField="Phone" dataType="string" />
        <Column dataField="Fax" dataType="string" />
        <Column
          dataField="City"
          dataType="string"
          visible={includeAllColumnsInExport}
        />
        <Column
          dataField="State"
          dataType="string"
          visible={includeAllColumnsInExport}
        />
      </DataGrid>
    </DataGridContainer>
  );
}
