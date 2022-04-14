import React from "react";
import { container } from "../container";
import { DiProvider } from "./context";
import { ApplicationProps } from "./interface";

export const Application = (props: ApplicationProps) => {
  return (
    <DiProvider value={{
      container
    }}>
      {props.children}
    </DiProvider>
  )
}