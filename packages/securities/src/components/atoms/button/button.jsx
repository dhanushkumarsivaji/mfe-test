import React from "react";
import { Button as MaterialButton } from "@mui/material";

export default function Button({ handleClick, text, style, key }) {
  return (
    <MaterialButton
      key={key}
      onClick={handleClick}
      style={{ textTransform: "none", ...style }}
    >
      {text}
    </MaterialButton>
  );
}
