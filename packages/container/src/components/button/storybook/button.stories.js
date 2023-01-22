import React from "react";
import Button from "../button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "D&C/Atoms/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const HelloWorld = Template.bind({});

HelloWorld.args = {
  label: "Hello world!",
  variant: 'outlined'
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  label: "Click me!",
  variant: 'contained'
};