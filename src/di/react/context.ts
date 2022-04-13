import React from 'react';

export const Context = React.createContext({
  getDependencies(deps: any, targetChild?: any) {
    return deps
  }
})