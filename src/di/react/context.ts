import { Container } from 'inversify';
import React from 'react';

export const Context = React.createContext<{
  container: Container | null
}>({
  container: null
})

export const DiConsumer = Context.Consumer;