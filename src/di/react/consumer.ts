import { interfaces } from "inversify";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";

export function useInject<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(Context)

  if (!container) { throw new Error("container null create!") }
  return container.get<T>(identifier);
}