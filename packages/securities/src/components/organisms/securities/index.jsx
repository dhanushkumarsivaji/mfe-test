import React from "react";
import {
  Paper,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Divider,
  DialogContentText,
} from "@mui/material";

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
  FilterPanel,
} from "devextreme-react/data-grid";
import Button from "../../atoms/button/button";
import DialogBox from "../../molecules/dialogBox";
import DialogTitle from "../../molecules/dialogTitle";





export default function Securities(props) {
  const {
    data,
    useLayout,
    setUseLayout,
    open,
    setOpen,
    openCreatLayout,
    setOpenCreatLayout,
    layOuts,
    openDialog,
    pageSizes,
    exportFormats,
    handleSelect,
    handleDefault,
    handleSelectLayout,
    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    deleteLayout,
    handleClose,
    onExporting,
    handleClick,
    loadState,
    setGridRef,
    input,
    editLayout,
    setOpenDialog,
  } = props;

  return (
    <Paper sx={{ pt: 3 }}>
      <Button handleClick={() => setOpen(true)} text="Layouts" />
      <Button handleClick={() => setOpenCreatLayout(true)} text="Save Layout" />
      <DataGrid
        dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        onExporting={onExporting}
        ref={(ref) => setGridRef(ref)}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />
        <StateStoring enabled={true} customLoad={loadState} type="custom" />
        <Sorting mode="multiple" />
        <Export enabled={true} formats={exportFormats} />
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
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
      <DialogBox
        handleClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          LayOuts
        </DialogTitle>
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
                  handleClick={() => handleSelect(item, index)}
                  text={item.layOutName}
                />

                <div>
                  <Button
                    handleClick={() => handleEdit(item, index)}
                    text="Edit"
                  />
                  <Button
                    handleClick={() => handleDelete(index)}
                    text="Delete"
                  />
                </div>
              </div>
              <Divider />
            </div>
          ))}
          <br />
        </DialogContent>
        <DialogActions>
          <Button handleClick={handleSelectLayout} text="Select Layout" />
          <Button onClick={handleDefault} text="Set Default" />
        </DialogActions>
      </DialogBox>
      <DialogBox
        handleClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openCreatLayout}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {editLayout !== null ? "Edit Layout" : "Create Layout"}
        </DialogTitle>
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
          <Button
            style={{ textTransform: "none" }}
            handleClick={handleClick}
            text={editLayout !== null ? "Update Layout" : "Create Layout"}
          />
        </DialogActions>
      </DialogBox>
      <DialogBox
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
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
          <Button handleClick={deleteLayout} text="Confirm" />
          <Button handleClick={() => setOpenDialog(false)} text="Cancel" />
        </DialogActions>
      </DialogBox>
    </Paper>
  );
}
// <Summary>
//           <GroupItem column="price" summaryType="sum" alignByColumn={true} />
//         </Summary>
