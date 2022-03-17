import { BehaviorSubject } from "rxjs";

class MagicMethod {
  constructor() {
    return this.asProxy();
  }

  asProxy() {
    /**
      * This function is called whenever any property on the Proxy 
      * is called.
      * 
      * @param target the "parent" object; the object the proxy 
      *        virtualizes
      * @param prop the property called on the Proxy
      */
    const handler = {
      get: function (target: any, prop: string) {
        if (typeof target[prop] !== 'undefined') {
          return target[prop];
        }
        // TODO: implement custom logic
        if (prop.startsWith('get')) {
          return function () {
            return new BehaviorSubject<any>("").asObservable();
          }
        }

        if (prop.startsWith('set')) {
          return function () { }
        }

      }
    };

    return new Proxy(this, handler)
  }
}

export default MagicMethod;