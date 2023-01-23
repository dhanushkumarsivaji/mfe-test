import React from "react";
import ErrorBoundary from "./ErrorBoundary";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "D&C/Molecules/ErrorBoundary",
  component: ErrorBoundary,
};

const Template = (args) => <ErrorBoundary {...args} />;

export const Error = Template.bind({});

Error.args = {};
