import React from "react";
import Form from "./Form";
import { render, fireEvent, screen } from "@testing-library/react";

describe.only("Form", () => {
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

  test("should watch input correctly", () => {
    const { getByText } = render(
      <Form
        onSubmit={onSubmit}
        exportFormatsData={exportFormatsData}
        handleExportModalClose={handleExportModalClose}
        setIncludeAllColumnsInExport={setIncludeAllColumnsInExport}
      />
    );

    fireEvent.input(getByText("exportfilename"), {
      target: {
        value: "test",
      },
    });

    screen.debug();

    // expect(getByTestId("exportfilename").innerHTML).toEqual("Hidden message");
  });

  //   test("should display correct error message", () => {
  //     const { getByTestId, findByText } = render(<Form />);

  //     getByTestId("submit");

  //     fireEvent.click(getByTestId("submit"));

  //     findByText("This field is required");
  //   });
});
