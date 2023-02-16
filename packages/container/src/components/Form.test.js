import React from "react";
import Form from "./Form";
import { render, fireEvent, act} from "@testing-library/react";

describe.only("grid export form", () => {
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
  const handleExportModalClose = jest.fn();
  const setIncludeAllColumnsInExport = jest.fn();
  const onSubmit = jest.fn();

  test("renders default state", () => {
    const { getByTestId } = render(
      <Form
        onSubmit={onSubmit}
        exportFormatsData={exportFormatsData}
        handleExportModalClose={handleExportModalClose}
        setIncludeAllColumnsInExport={setIncludeAllColumnsInExport}
      />
    );

    const exportFileFormatInput = getByTestId("exportfileformat");
    const exportFilenameInput = getByTestId("exportfilename");
    const exportSubmitButton = getByTestId("submit");
    const exportCancelButton = getByTestId("cancel-btn");
    const exportAllColumnsCheckbox = getByTestId('include-all-columns-checkbox')

    expect(exportFileFormatInput.value).toEqual("xlsx");
    expect(exportFilenameInput.value).toEqual("");
    expect(exportSubmitButton).toHaveClass("Mui-disabled");
    expect(exportCancelButton).toBeInTheDocument();
    expect(exportAllColumnsCheckbox).toBeInTheDocument();
    // expect(checkbox).toHaveProperty('checked', false)

  });

    test("keeps the submit button disabled when less than two character is provided in the filename input", () => {
        const { getByTestId } = render(
            <Form
              onSubmit={onSubmit}
              exportFormatsData={exportFormatsData}
              handleExportModalClose={handleExportModalClose}
              setIncludeAllColumnsInExport={setIncludeAllColumnsInExport}
            />
          );

      const exportFilenameInput = getByTestId("exportfilename");
        fireEvent.input(exportFilenameInput, {
        target: {
            value: "t",
        },
        });
        const exportSubmitButton = getByTestId("submit");
        expect(getByTestId("exportfilename").value).toEqual("t");
        expect(exportSubmitButton).toHaveClass("Mui-disabled");
    });

    test("keeps the submit button disabled when more than twenty four character is provided in the filename input", () => {
        const { getByTestId } = render(
            <Form
              onSubmit={onSubmit}
              exportFormatsData={exportFormatsData}
              handleExportModalClose={handleExportModalClose}
              setIncludeAllColumnsInExport={setIncludeAllColumnsInExport}
            />
          );

      const exportFilenameInput = getByTestId("exportfilename");
        fireEvent.input(exportFilenameInput, {
        target: {
            value: "asasasasasasasaasasasasasasasa",
        },
        });
        const exportSubmitButton = getByTestId("submit");
        expect(getByTestId("exportfilename").value).toEqual("asasasasasasasaasasasasasasasa");
        expect(exportSubmitButton).toHaveClass("Mui-disabled");
    });

    test("enables the submit button when the form is filled out", async () => {
        const { getByTestId } = render(
            <Form
              onSubmit={onSubmit}
              exportFormatsData={exportFormatsData}
              handleExportModalClose={handleExportModalClose}
              setIncludeAllColumnsInExport={setIncludeAllColumnsInExport}
            />
          );

      const exportFilenameInput = getByTestId("exportfilename");
      const exportSubmitButton = getByTestId("submit");

       await act(() => {
        fireEvent.input(exportFilenameInput, {
            target: {
                value: "new",
            },
            });
        expect(getByTestId("exportfilename").value).toEqual("new");
      })
      expect(exportSubmitButton).not.toHaveClass("Mui-disabled");

      await act(() => {
        fireEvent.click(exportSubmitButton);
      })
      expect(onSubmit).toBeCalled();
    });

});
