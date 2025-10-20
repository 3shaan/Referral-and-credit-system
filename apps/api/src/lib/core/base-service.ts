// BaseService.ts
export abstract class BaseService {
  constructor() {
    this.bindAllMethods();
  }

  private bindAllMethods(): void {
    let proto = Object.getPrototypeOf(this);

    // walk up the prototype chain until Object.prototype
    while (proto && proto !== Object.prototype) {
      const names = Object.getOwnPropertyNames(proto);
      for (const name of names) {
        if (name === "constructor") continue;

        // skip if already an own property (arrow methods / instance props)
        if (Object.prototype.hasOwnProperty.call(this, name)) continue;

        const desc = Object.getOwnPropertyDescriptor(proto, name);
        // only bind real functions (not getters/setters)
        if (!desc || typeof desc.value !== "function") continue;

        Object.defineProperty(this, name, {
          value: (desc.value as Function).bind(this),
          writable: true,
          configurable: true,
        });
      }

      proto = Object.getPrototypeOf(proto);
    }
  }
}
