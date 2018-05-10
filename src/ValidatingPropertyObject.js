define('ValidatingPropertyObject', [], () =>
  class ValidatingPropertyObject {
    constructor() {
      this.properties = new Map();
    }
    getValue(key) {
      if (
        key === undefined ||
        key === null ||
        this.properties.get(key) === undefined
      ) {
        throw Error(`invalid key ${key}`);
      }

      return this.properties.get(key);
    }
    setValue(key, value) {
      this.properties.set(key, value);
    }
  });
