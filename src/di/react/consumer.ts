import { interfaces } from "inversify";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";

export function useInject<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(Context)

  const [service, setService] = useState<T>();

  if (!container) { throw new Error("container null create!") }

  useEffect(() => {
    const target = container?.get<T>(identifier)
    setService(target)
  }, [container])
 
  return service;
}