import React from "react";
import { container } from "../container";
import { DiProvider } from "./provider";
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