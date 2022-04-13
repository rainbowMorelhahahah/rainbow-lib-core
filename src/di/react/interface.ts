import React from "react"
import { KEY } from "./constants"


export type DiProviderProps = {
  children?: React.ReactNode | React.FC
  target?: React.ReactNode
  use?: any[]
}

export interface Implementation {
  displayName: string
  [KEY]: string
}