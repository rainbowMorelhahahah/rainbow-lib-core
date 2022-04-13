import React, { useContext, useMemo, forwardRef } from 'react';

import PropTypes from 'prop-types';

import { KEY } from './constants';
import { Context } from './context';
import { getDisplayName } from './utils';
import { DiProviderProps } from './interface';

export const DiProvider = (props: DiProviderProps) => {

  const { children, target, use = [] } = props;

  const { getDependencies } = useContext(Context);

  const value = useMemo(() => {
    // support single or multiple targets
    const replacementMap = use.reduce((m, d) => m.set(d[KEY], d), new Map())

    const targets = target && (Array.isArray(target) ? target : [target]);

    return {
      getDependencies(realDeps: any, targetChild: any) {
        const dependencies: any[] = getDependencies(realDeps, targetChild);

        if (!targetChild || !targets || targets.includes(targetChild)) {
          return dependencies.map(dep => {
            const real = dep[KEY] || dep;
            return replacementMap.get(real) || dep;
          })
        }
        return dependencies;
      },
    };
  }, [getDependencies]);

  return <Context.Provider value={value}>{children}</Context.Provider>

}

export function withDi(Comp: any, deps: any, target = null) {
  const WrappedComponent = forwardRef((props, ref) => (
    <DiProvider use={deps} target={target}>
      <Comp ref={ref} {...props} />
    </DiProvider>
  ))
  WrappedComponent.displayName = getDisplayName(Comp, 'withDi');
  return WrappedComponent
}