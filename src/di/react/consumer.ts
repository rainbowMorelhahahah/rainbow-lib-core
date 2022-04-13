import { PACKAGE_NAME } from "./constants";
import { Context } from "./context"
import { mock, warnOnce } from "./utils";

function di(deps: any[], target?: any) {
  if (Array.isArray(deps)) {
    //@ts-ignore
    const { getDependencies = (v) => v } = Context._currentValue || {}
    return getDependencies(deps, target);
  } else {
    warnOnce(`Seems like you are using ${PACKAGE_NAME} without Babel plugin. ` +
      `Please add '${PACKAGE_NAME}/babel-plugin' to your Babel config ` +
      `or import from '${PACKAGE_NAME}/macro' if your are using 'babel-plugin-macros'. ` +
      `di(...) run as a no-op.`);
  }
}

/** @deprecated use injectable instead */
di.mock = mock;

export {
  di
}