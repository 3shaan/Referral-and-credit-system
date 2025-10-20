export abstract class BaseService {
  constructor() {
    this.bindAllMethods();
  }

  private bindAllMethods(): void {
    let proto = Object.getPrototypeOf(this);
    while (proto && proto !== Object.prototype) {
      for (const name of Object.getOwnPropertyNames(proto)) {
        if (name === "constructor")
          continue;
        if (Object.prototype.hasOwnProperty.call(this, name))
          continue;
        const desc = Object.getOwnPropertyDescriptor(proto, name);
        if (!desc || typeof desc.value !== "function")
          continue;
        Object.defineProperty(this, name, {
          // eslint-disable-next-line ts/no-unsafe-function-type
          value: (desc.value as Function).bind(this),
          writable: true,
          configurable: true,
        });
      }
      proto = Object.getPrototypeOf(proto);
    }
  }
}
